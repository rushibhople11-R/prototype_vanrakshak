import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/client';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { verificationStatus, verificationNotes, verifiedBy } = body;

    const db = getDatabase();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE threat_alerts
      SET verification_status = ?, verification_notes = ?, verified_by = ?, verified_at = ?
      WHERE id = ?
    `);

    const result = stmt.run(verificationStatus, verificationNotes || null, verifiedBy || 'Officer', now, id);

    if (result.changes === 0) {
      return NextResponse.json({ success: false, error: 'Alert not found' }, { status: 404 });
    }

    // Log to audit log
    db.prepare(`
      INSERT INTO audit_logs (action, details, actor, created_at)
      VALUES (?, ?, ?, ?)
    `).run('VERIFY_ALERT', `Alert ${id} updated to ${verificationStatus}`, verifiedBy || 'Officer', now);

    return NextResponse.json({ success: true, id, verificationStatus, verifiedAt: now });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

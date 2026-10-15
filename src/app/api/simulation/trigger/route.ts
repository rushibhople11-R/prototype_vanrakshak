import { NextRequest, NextResponse } from 'next/server';
import { encodeLoRaPacket } from '@/lib/lora/packet-codec';
import { ThreatType } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      scenario = 'CHAINSAW',
      node_id = 3,
      confidence = 96,
      spl = 89,
    } = body;

    const threatType: ThreatType =
      scenario === 'AXE'
        ? 'AXE'
        : scenario === 'TRACTOR'
        ? 'HEAVY_VEHICLE'
        : scenario === 'GUNSHOT'
        ? 'GUNSHOT'
        : 'CHAINSAW';

    // Construct 16-byte synthetic binary LoRa packet
    const rawHex = encodeLoRaPacket(
      node_id,
      'ALERT',
      threatType,
      confidence,
      spl,
      3310, // 3.31V
      true, // solar charging
      Math.floor(Math.random() * 500)
    );

    // Call internal uplink
    const uplinkUrl = new URL('/api/gateway/uplink', req.url);
    const uplinkRes = await fetch(uplinkUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        raw_payload_hex: rawHex,
        gateway_id: 'GW-SIMULATOR-01',
        rssi: -101,
        snr: 6.5,
        frequency_mhz: 865.2,
        is_simulated: true,
      }),
    });

    const uplinkData = await uplinkRes.json();

    return NextResponse.json({
      success: true,
      message: `Simulated ${threatType} event injected at VN-NODE-0${node_id}`,
      rawHex,
      uplinkResult: uplinkData,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

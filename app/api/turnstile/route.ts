import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token ausente' },
        { status: 400 }
      );
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
      return NextResponse.json(
        { success: false, error: 'Secret Key não configurada' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret,
          response: token,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Falha na verificação Turnstile',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao validar Turnstile',
      },
      { status: 500 }
    );
  }
}
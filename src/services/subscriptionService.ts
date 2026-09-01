export interface AppLicense {
  licenseKey: string;
  isActive: boolean;
  expiresAt: string;
  planName: string;
  priceBRL: number;
}

export class SubscriptionService {
  private static readonly ANNUAL_PRICE_BRL = 50.0;

  // Validação local ou remota da ativação anual do app
  static checkLicenseStatus(deviceId: string): AppLicense {
    return {
      licenseKey: `LIC-${deviceId.substring(0, 8).toUpperCase()}`,
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      planName: 'Licença Anual CinePlay OTT',
      priceBRL: this.ANNUAL_PRICE_BRL,
    };
  }

  // Gera payload para Checkout Pix / App Store / Play Store
  static generateAnnualOrder(deviceId: string) {
    return {
      sku: 'cineplay_ott_annual_50',
      description: 'Assinatura Anual do Aplicativo CinePlay OTT (1 Ano)',
      amount: this.ANNUAL_PRICE_BRL,
      currency: 'BRL',
      deviceId,
      pixPayload: `00020126580014BR.GOV.BCB.PIX0136${deviceId}520400005303986540550.005802BR5915CinePlay OTT6009Sao Paulo62070503***6304E1B2`,
    };
  }
}

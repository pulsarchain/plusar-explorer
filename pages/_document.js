import Document, { Head, Main, NextScript } from "next/document";

class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req } = context;
    const { localeDataScript, locale } = req;
    return { ...props, locale, localeDataScript };
  }
  render() {
    return (
      <html lang={this.props.locale}>
        <Head />
        <meta name="format-detection" content="telephone=no, email=no" />
        <meta name="full-screen" content="yes" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover" />
        <link rel="icon" href="/static/favicon.png" type="image/x-icon" />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default IntlDocument;

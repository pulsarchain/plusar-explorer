import { NextSeo } from 'next-seo';
import { injectIntl } from 'react-intl';
function DefaultSeo(props) {
  const { intl } = props;
  const defaultPageSeo = {
    title: intl.formatMessage({ id: 'seo.title' }),
    keywords: intl.formatMessage({ id: 'seo.keywords' }),
    description: intl.formatMessage({ id: 'seo.description' })
  };
  const {
    title = defaultPageSeo.title,
    keywords = defaultPageSeo.keywords,
    description = defaultPageSeo.description
  } = props;
  const setingSeo = {
    title,
    titleTemplate: `${
      title === defaultPageSeo.title ? defaultPageSeo.title : `%s | ${defaultPageSeo.title}`
    }`,
    description,
    additionalMetaTags: [{ name: 'keywords', content: keywords }],
    openGraph: {
      locale: intl.locale,
      site_name: defaultPageSeo.title
    }
  };
  return <NextSeo {...setingSeo} />;
}

export default injectIntl(DefaultSeo);

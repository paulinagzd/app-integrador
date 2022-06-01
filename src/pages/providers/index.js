import { useContext } from 'react';
import { pageContext, PageProvider } from './PageProviders';

const usePageProvider = () => useContext(pageContext);

export { PageProvider, usePageProvider };

const getQueriesParams = (): Object =>
  location.search === ''
    ? {}
    : JSON.parse(
        `{"${decodeURI(
          location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')
        )}"}`
      );

export default getQueriesParams;
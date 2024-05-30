import config from '../config';

const isJsonString = str => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }

  return true;
}

const requestAPI = async (url, body = {}, isMultiform = false) => {
  try {

    let data = await fetch(`${config.url}/${url}`, {
      method: 'POST',
      credentials: 'include',
      headers: isMultiform
          ? undefined
          : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
      body: isMultiform ? body : JSON.stringify(body),
    });
    
    if (data?.status === 401) {
      // logged out
      window.logout({ type: 'soft'});
    }

    const res = await data.text();

    if(isJsonString(res)) return JSON.parse(res);
    else return {error: res};
  } catch(e) {
    return {error: e.message};
  }
}

export default requestAPI;
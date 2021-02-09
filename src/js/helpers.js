import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/* export async function getJson(url) {
  try {
    // const response = await fetch(`${API_URL}/${id}`);
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
    return data;
    // async bt3ml return l promise el resolved Data feh heya ele byt3mlha return ele heya hena const=data w await btgeb l Data el resolved 3ltol fa fel file ele bnst5dmo lma 23ml getJson  m3 await s3tha await hta5od el resolved Data mn el promise ele bt3mlo async deh ele hwa el Data bt3to const=data
  } catch (error) {
    throw error;
  }
}

export async function sendJson(url, recipe) {
  try {
    const responsePromise = fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(recipe),
    });

    const response = await Promise.race([
      responsePromise,
      timeout(TIMEOUT_SEC),
    ]);

    const data = await response.json();

    console.log(response);
    console.log(data);
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
    return data;
    // async bt3ml return l promise el resolved Data feh heya ele byt3mlha return ele heya hena const=data w await btgeb l Data el resolved 3ltol fa fel file ele bnst5dmo lma 23ml getJson  m3 await s3tha await hta5od el resolved Data mn el promise ele bt3mlo async deh ele hwa el Data bt3to const=data
  } catch (error) {
    throw error;
  }
} */

export async function ajax(url, recipe = undefined) {
  try {
    const responsePromise = recipe
      ? fetch(url, {
          method: 'post',
          headers: { 'Content-Type': 'Application/json' },
          body: JSON.stringify(recipe),
        })
      : fetch(url);

    const response = await Promise.race([
      responsePromise,
      timeout(TIMEOUT_SEC),
    ]);

    const data = await response.json();

    console.log(response);
    console.log(data);
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
    return data;
    // async bt3ml return l promise el resolved Data feh heya ele byt3mlha return ele heya hena const=data w await btgeb l Data el resolved 3ltol fa fel file ele bnst5dmo lma 23ml getJson  m3 await s3tha await hta5od el resolved Data mn el promise ele bt3mlo async deh ele hwa el Data bt3to const=data
  } catch (error) {
    throw error;
  }
}

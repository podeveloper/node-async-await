const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write file');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise('dog.txt');
    console.log('Breed: ' + data);

    const res = await superagent.get(
      'https://dog.ceo/api/breed/' + data + '/images/random'
    );
    console.log(res.body.message);

    await writeFilePromise('dog-img.txt', res.body.message);
    console.log('random dog saved');
  } catch (error) {
    console.log('err');
  }
};

getDogPic();

/*
readFilePromise('dog.txt')
  .then((data) => {
    console.log('Breed: ' + data);
    return superagent.get(
      'https://dog.ceo/api/breed/' + data + '/images/random'
    );
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('random dog saved');
  })
  .catch((err) => {
    console.log(err.message);
  });
*/

const oauth = {
  "clientId": "901473172fc3db88006d4058e7360ee7d1a84f0352b01a3d846dae336ddd5a10",
  "clientSecret": "d54e6b252604fe28e6ac9deeffbfb1a01710b272ed4c07d24b7dabf6a4f933e6"
};

const schoolLevel = '575df0c6830f786b84e51f93';
const grade = '575df0c7830f786b84e52005';
const etablishmentId = '5769475d451c957aac42ca7f';
const subject = '575df0c7830f786b84e5200b';
const classroom = 'test-ws';

// const V2 = require('./dist/edulib.ws.v2');
// const v2 = new V2({
//   env: 'staging',
//   oAuthApp: oauth
// });
// v2.authenticate('one', 'password').then(auth => {
//   console.log(auth);
//   v2.getUser().then(user => console.log(user));
// });

// const V3 = require('./dist').EdulibV3;
// const v3 = new V3({
//   env: 'production',
//   authToken: 'edulib-internal-api'
// });

// v3.getUserByCredential('one', 'password').then(user => console.log(user));
// v3.setUserSsoId('58807a36ccacda73bfcaa63e', null).then(user => console.log(user));
// v3.getUserBySsoId('0932638M','53ffd3cb-e0e9-4703-8cf3-b886fcc14f67', null).then(user => console.log(user));
// v3.getEtablishmentCatalog('1000001H').then(catalog => console.log(catalog));
// v3.getUserBySsoId('1000051M', '16F81CC6015F239FFA23D166DBB689A5').then(
// v3.getUserBySsoId('1000001H', 'test').then(
//   user => console.log(user),
//   err => console.error(err));

const V4 = require('./dist').EdulibV4;
const v4 = new V4({
  env: 'staging',
  oAuthApp: oauth
});
// v4.authenticate('one', 'password').then((auth) => {
//   console.log(auth);
// return v4.getGrades().then(data => console.log(data));
// return v4.getSchoolLevels().then(data => console.log(data));
// return v4.getSubjects().then(data => console.log(data));
// v4.getEstablishmentClassrooms('1000001H').then(data => console.log(data));
// v4.getEstablishmentClassroom('1000001H', classroom).then(data => console.log(data));
// v4.getEstablishmentAccounts().then(data => console.log(data));
// return v4.createClassroom({
//   establishment_account_id: etablishmentId,
//   school_level_id: schoolLevel,
//   grade_id: grade,
//   degree_id: null,
//   name: 'test-ws',
//   code: classroom
// }).then(data => console.log(data));
// return v4.createStudent({
//   establishment_account_id: etablishmentId,
//   last_name: 'test',
//   first_name: 'test',
//   email: 'test-ws-student@student.edulib.fr',
//   password: 'password',
//   classroom_id: classroom
// }).then(data => console.log(data));
//   return v4.createTeacher({
//     establishment_account_id: etablishmentId,
//     last_name: 'test',
//     first_name: 'test',
//     email: 'test-ws-student@student.edulib.fr',
//     password: 'password',
//     classroom_ids: [classroom],
//     subject_ids: [subject]
//   }).then(data => console.log(data));
// }, err => console.error('error:', err))
// .catch(err => console.error('catched error:', err));

// console.log(
//   v4.flattenJSON({
//     teacher: {
//       establishment_account_id: etablishmentId,
//       last_name: 'test',
//       first_name: 'test',
//       email: 'test-ws-student@student.edulib.fr',
//       password: 'password',
//       classroom_ids: [classroom],
//       subject_ids: [subject]
//     }
//   })
// );
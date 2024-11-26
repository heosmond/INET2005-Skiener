import passwordValidator from 'password-validator';

var schema = new passwordValidator;

schema
.is().min(8)
.has().digits(1)
.has().lowercase(1)
.has().uppercase(1)

export { schema };

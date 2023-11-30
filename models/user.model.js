var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    useremail: {
        type: String,
        required: [true, "Insert your useremail."],
        unique: [true, "useremail have to be unique string."],
        lowercase: true
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length >= 6;
            }, 'Password must provide over 6 characters.'
        ]
    },
    name: {
        type: String,
        required: [true, "Insert name."]
    },
    gender: {
        type: String,
        default: "male" // 
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: "191-000-0000"
    },
    lastLogin: { // lastest login time
        type: Date,
        default: Date.now()
    },
    logins: { // login number
        type: Number,
        default: 0
    },
    // roles: String,
    // roles: { // 
    //     type: Schema.Types.Array,
    //     default: ["user", "admin"] // 'user' is common user, "admin" is administrator, "signer" is publish tester
    // },
    role: {
        type: Number,
        default: 1
    },
    allow: { // using allow
        type: Number,
        default: 1 // 0 is waiting, -1 is block, 1 is accept
    },
    salt: {
        type: String
    },
}, {
    timestamps: true
});

// To hash password before save into database
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.salt = new Buffer.alloc(16, crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// Return hased password
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000,
        64, 'sha512').toString('base64');
};

// Compared hased password from user with database's password so if exist, then res is true, not false
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Register maked Schema as User moder into Database
// Third parameter is collection name that User model register into database as user 
// If you don't give third parameter, register into Database as users 
mongoose.model('User', UserSchema, "user");
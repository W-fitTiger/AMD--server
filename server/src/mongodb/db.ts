

import mongoose from 'mongoose';
import config from 'config-lite';
import chalk from 'chalk';
mongoose.connect(config.url);
declare const global
mongoose.Promise = global.Promise;

const db = mongoose.connect("mongodb://localhost/myapp");





export default db;
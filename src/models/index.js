export { default as User } from './User';
export { default as Group } from './Group';
export { default as Address } from './Address';
export { default as UserGroup } from './User_Group';

import { sequelize } from '../connections';

for (let m in sequelize.models) {
    sequelize.models[m].sync();
}

for (let m in sequelize.models) {
    sequelize.models[m].association();
}
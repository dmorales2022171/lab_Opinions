import Role from '../roles/role.model.js'

export const isRoleValid = async (role = '') =>{
    const existRole = await  Role.findOne({role});
    if(!existRole){ 
        throw new Error(`the role ${role} already exists in the database`);
    }
}
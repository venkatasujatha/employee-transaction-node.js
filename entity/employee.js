const EntitySchema = require('typeorm').EntitySchema;

const employees = new EntitySchema({
    name: 'Employees',
    columns:{
        id: {
            primary: true,
            type:'int',
            generated: true
        },
        name :{
            type:'varchar'
        }
    }
})

module.exports = {employees};
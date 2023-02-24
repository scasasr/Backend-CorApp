import {Schema,model} from 'mongoose'

const tuCompraSchema = new Schema({
    json:[{ type: Object, require: true}]
});
//test commit

export const TuCompra = model('tuCompra',tuCompraSchema)
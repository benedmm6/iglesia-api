import gruposModel from '../models/grupos.model';

export const createGrupo = async (req, res) => {

    const {name, lider, fecha_create, adress: { street: street, cp: cp }, members, coordinacion: { coordinacion: coordinacion, coordinador: coordinador} } = req.body
     
    const newGrupo = new gruposModel({ name: req.body.name, 
                lider: req.body.lider, 
                fecha_create: req.body.fecha_create, 
                adress: { street: req.body.adress.street, cp: req.body.adress.cp}, 
                members:[], 
                coordinacion:{ coordinacion: req.body.coordinacion.coordinacion, coordinador: req.body.coordinacion.coordinador} 
    });
    
    const grupoSaved = await newGrupo.save();

    res.status(201).json(grupoSaved);

}

export const getGrupos = async (req, res) => {
    
    const grupos = await gruposModel.find();

    res.json(grupos);

}

export const getGrupoById = async (req, res) => {
    
    const grupo = await gruposModel.findById(req.params.grupoId);

    res.status(200).json(grupo);

}

export const updateGrupoById = async (req, res) => {

    const updateGrupo = await gruposModel.findByIdAndUpdate(req.params.grupoId, req.body,{
        new: true
    });

    res.status(200).json(updateGrupo);
    
}

export const deleteGrupoById = async (req, res) => {
    
    await gruposModel.findByIdAndDelete(req.params.grupoId);

    res.status(204).json();
    
}
/* Registro compartido de asignaturas y unidades de Estudiar SMX.
   Añadir una unidad aquí permite que el portal muestre su progreso. */
window.SMX_UNITS = {
  ipo: {
    subjectId: 'ipo',
    code: 'IPO',
    subject: 'Itinerario Personal para la Ocupabilidad',
    unit: 'Unidad 1',
    storageKey: 'rutaFP.u1.v1',
    totalCards: 27,
    sections: [
      { id: 'fp', title: 'La FP y tu título', desc: 'La FP, los títulos y cómo se regula tu ciclo.' },
      { id: 'sector', title: 'Tu sector y tu perfil', desc: 'El real decreto, el perfil y el entorno profesional.' },
      { id: 'competencias', title: 'Competencias y soft skills', desc: 'Lo técnico te contrata; lo personal te mantiene.' },
      { id: 'empleo', title: 'Oportunidades de trabajo', desc: 'Cuenta ajena, función pública y autoempleo.' },
      { id: 'itinerario', title: 'Diseña tu próximo paso', desc: 'Tu itinerario y tu plan de acción.' }
    ]
  },
  ceac: {
    subjectId: 'ceac',
    code: 'CEAC',
    subject: 'Comunicació Empresarial i Atenció al Client',
    unit: 'Unidad 1',
    storageKey: 'rutaFP.ceac.u1.v1',
    totalCards: 27,
    sections: [
      { id: 'empresa', title: 'La empresa y su organización', desc: 'Elementos, principios, departamentos y organigramas.' },
      { id: 'informacio', title: 'La información en la empresa', desc: 'Sistemas, fuentes y criterios de utilidad.' },
      { id: 'comunicacio', title: 'El proceso de comunicación', desc: 'Elementos, etapas, tipos e interferencias.' },
      { id: 'empresa-comunicacio', title: 'La comunicación en la empresa', desc: 'Flujos internos, canales y comunicación externa.' },
      { id: 'eficacia', title: 'La eficacia de la comunicación', desc: 'Mensaje, canal, actitudes y barreras.' }
    ]
  }
};

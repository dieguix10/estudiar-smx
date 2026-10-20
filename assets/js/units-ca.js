/* Registre compartit d'assignatures i unitats d'Estudiar SMX (català).
   Afegir una unitat aquí permet que el portal mostri el seu progrés. */
window.SMX_UNITS = {
  ipo: {
    subjectId: 'ipo',
    code: 'IPO',
    subject: 'Itinerari Personal per a l\'Ocupabilitat',
    unit: 'Unitat 1',
    storageKey: 'rutaFP.u1.v1',
    totalCards: 27,
    sections: [
      { id: 'fp', title: 'La FP i el teu títol', desc: 'La FP, els títols i com es regula el teu cicle.' },
      { id: 'sector', title: 'El teu sector i el teu perfil', desc: 'El reial decret, el perfil i l\'entorn professional.' },
      { id: 'competencias', title: 'Competències i habilitats toves', desc: 'El tècnic et contracta; el personal et manté.' },
      { id: 'empleo', title: 'Oportunitats de treball', desc: 'Compte aliè, funció pública i autoocupació.' },
      { id: 'itinerario', title: 'Dissenya el teu proper pas', desc: 'El teu itinerari i el teu pla d\'acció.' }
    ]
  },
  ceac: {
    subjectId: 'ceac',
    code: 'CEAC',
    subject: 'Comunicació Empresarial i Atenció al Client',
    unit: 'Unitat 1',
    storageKey: 'rutaFP.ceac.u1.v1',
    totalCards: 27,
    sections: [
      { id: 'empresa', title: 'L\'empresa i la seva organització', desc: 'Elements, principis, departaments i organigrames.' },
      { id: 'informacio', title: 'La informació a l\'empresa', desc: 'Sistemes, fonts i criteris d\'utilitat.' },
      { id: 'comunicacio', title: 'El procés de comunicació', desc: 'Elements, etapes, tipus i interferències.' },
      { id: 'empresa-comunicacio', title: 'La comunicació a l\'empresa', desc: 'Fluxos interns, canals i comunicació externa.' },
      { id: 'eficacia', title: 'L\'eficàcia de la comunicació', desc: 'Missatge, canal, actituds i barreres.' }
    ]
  }
};

const unitMap = {
    "g/ml-m": { value: 1000, useMW: true },
    "mg/ml-m": { value: 1, useMW: true },
    "g/ml-mg/ml": { value: 0, useMW: false },
    "mg/ml-μm": { value: 1e-6, useMW: true },
    "mg/ml-mm": { value: 1e-3, useMW: true },
    "m-mg/ml": { value: 1, useMW: true },
    "m-g/ml": { value: 1e-3, useMW: true },
    "μm-mg/ml": { value: 1e6, useMW: true },
    "μm-g/ml": { value: 1e3, useMW: true },
    "mm-mg/ml": { value: 1e3, useMW: true },
    "m-mm": { value: 1e3, useMW: false },
    "m-μm": { value: 1e6, useMW: false },
    "mm-m": { value: 1e-3, useMW: false },
    "μm-m": { value: 1e-6, useMW: false },
    "mm-g/ml": { value: 1, useMW: true },
    "mm-μm": { value: 1000, useMW: false },
    "μm-mm": { value: 0.001, useMW: false },
    "mg/ml-g/ml": { value: 0.001, useMW: false },
    "g/ml-gm/ml": { value: 1, useMW: false }
};

export default unitMap;
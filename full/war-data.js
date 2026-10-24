export const WAR_RESOURCES=[
  "fuel",
  "alloy",
  "materiel"
];
export const WAR_PHASES=[
  "economy",
  "planning",
  "movement",
  "combat",
  "refit",
  "morale",
  "production"
];
export const COLOR_FACES=[
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "blue",
  "blue",
  "blue",
  "green",
  "green",
  "red",
  "black",
  "white"
];
export const HIT_ORDER=[
  "yellow",
  "blue",
  "green",
  "red",
  "black",
  "white"
];
export const WAR_UNITS={
  "cohort": {
    "name": "Line cohort",
    "category": "ground",
    "color": "yellow",
    "cost": {
      "fuel": 0,
      "alloy": 0,
      "materiel": 2
    },
    "casualty": 2,
    "stances": {
      "defensive": {
        "air": 0,
        "surface": 1,
        "hits": 2
      },
      "offensive": {
        "air": 0,
        "surface": 2,
        "hits": 1
      }
    }
  },
  "battery": {
    "name": "Siege battery",
    "category": "ground",
    "color": "blue",
    "cost": {
      "fuel": 0,
      "alloy": 2,
      "materiel": 1
    },
    "casualty": 2,
    "stances": {
      "anti_air": {
        "air": 2,
        "surface": 1,
        "hits": 2
      },
      "ground": {
        "air": 0,
        "surface": 2,
        "hits": 2
      }
    }
  },
  "crawler": {
    "name": "Assault crawler",
    "category": "ground",
    "color": "green",
    "cost": {
      "fuel": 1,
      "alloy": 2,
      "materiel": 1
    },
    "casualty": 4,
    "stances": {
      "defensive": {
        "air": 1,
        "surface": 2,
        "hits": 3
      },
      "offensive": {
        "air": 0,
        "surface": 4,
        "hits": 2
      }
    }
  },
  "interceptor": {
    "name": "Interceptor wing",
    "category": "air",
    "color": "green",
    "cost": {
      "fuel": 2,
      "alloy": 1,
      "materiel": 1
    },
    "casualty": 4,
    "stances": {
      "air": {
        "air": 3,
        "surface": 0,
        "hits": 2
      },
      "surface": {
        "air": 0,
        "surface": 3,
        "hits": 2
      }
    }
  },
  "strike": {
    "name": "Strike wing",
    "category": "air",
    "color": "red",
    "cost": {
      "fuel": 2,
      "alloy": 2,
      "materiel": 1
    },
    "casualty": 6,
    "stances": {
      "ground": {
        "air": 1,
        "surface": 4,
        "hits": 2
      },
      "strategic": {
        "air": 1,
        "surface": 0,
        "hits": 2
      },
      "sea": {
        "air": 1,
        "surface": 3,
        "hits": 2
      }
    }
  },
  "submersible": {
    "name": "Stealth submersible",
    "category": "naval",
    "color": "yellow",
    "cost": {
      "fuel": 1,
      "alloy": 2,
      "materiel": 1
    },
    "casualty": 6,
    "stances": {
      "dive": {
        "air": 0,
        "surface": 2,
        "hits": 2
      }
    }
  },
  "escort": {
    "name": "Escort vessel",
    "category": "naval",
    "color": "blue",
    "cost": {
      "fuel": 2,
      "alloy": 3,
      "materiel": 2
    },
    "casualty": 10,
    "stances": {
      "escort": {
        "air": 2,
        "surface": 2,
        "hits": 2
      },
      "offensive": {
        "air": 1,
        "surface": 3,
        "hits": 2
      }
    }
  },
  "platform": {
    "name": "Aviation platform",
    "category": "naval",
    "color": "green",
    "cost": {
      "fuel": 4,
      "alloy": 3,
      "materiel": 3
    },
    "casualty": 20,
    "stances": {
      "anti_air": {
        "air": 2,
        "surface": 1,
        "hits": 3
      },
      "offensive": {
        "air": 1,
        "surface": 2,
        "hits": 3
      }
    }
  },
  "monitor": {
    "name": "Heavy monitor",
    "category": "naval",
    "color": "red",
    "cost": {
      "fuel": 3,
      "alloy": 4,
      "materiel": 3
    },
    "casualty": 20,
    "stances": {
      "anti_air": {
        "air": 2,
        "surface": 3,
        "hits": 3
      },
      "offensive": {
        "air": 1,
        "surface": 4,
        "hits": 3
      }
    }
  },
  "carrier_wing": {
    "name": "Embarked interceptor",
    "category": "air",
    "color": "green",
    "cost": null,
    "casualty": 4,
    "stances": {
      "air": {
        "air": 3,
        "surface": 0,
        "hits": 2
      },
      "surface": {
        "air": 0,
        "surface": 3,
        "hits": 2
      }
    },
    "temporary": true
  }
};
export const DEFAULT_STANCES={
  "cohort": "defensive",
  "battery": "ground",
  "crawler": "offensive",
  "interceptor": "air",
  "strike": "ground",
  "submersible": "dive",
  "escort": "escort",
  "platform": "anti_air",
  "monitor": "offensive",
  "carrier_wing": "air"
};
export const QUICK_VALUES={
  "land": {
    "cohort": {
      "air": 0,
      "surface": 1
    },
    "battery": {
      "air": 3,
      "surface": 2
    },
    "crawler": {
      "air": 1,
      "surface": 3
    },
    "interceptor": {
      "air": 3,
      "surface": 3
    },
    "carrier_wing": {
      "air": 3,
      "surface": 3
    },
    "strike": {
      "air": 1,
      "surface": 4
    }
  },
  "sea": {
    "submersible": {
      "air": 0,
      "surface": 2
    },
    "escort": {
      "air": 3,
      "surface": 3
    },
    "platform": {
      "air": 2,
      "surface": 2
    },
    "monitor": {
      "air": 3,
      "surface": 4
    },
    "interceptor": {
      "air": 3,
      "surface": 2
    },
    "carrier_wing": {
      "air": 3,
      "surface": 2
    },
    "strike": {
      "air": 1,
      "surface": 3
    }
  }
};
export const CASUALTY_BANDS=[
  {
    "minimum": 0,
    "stress": 0
  },
  {
    "minimum": 20,
    "stress": 1
  },
  {
    "minimum": 36,
    "stress": 2
  },
  {
    "minimum": 52,
    "stress": 3
  },
  {
    "minimum": 70,
    "stress": 4
  },
  {
    "minimum": 90,
    "stress": 5
  },
  {
    "minimum": 110,
    "stress": 6
  }
];
export const HOMELAND_ZONES=[
  {
    "zone": 0,
    "name": "stable",
    "penalty": null,
    "color": "#dee3e9"
  },
  {
    "zone": 1,
    "name": "civil_disruption",
    "penalty": "Pay 3 resources each morale if able",
    "color": "#739fd0"
  },
  {
    "zone": 2,
    "name": "transport_disruption",
    "penalty": "Owned rails unusable by all allies, no sea trade or port advantage, deployment still permitted",
    "color": "#e4ce6c"
  },
  {
    "zone": 3,
    "name": "command_disruption",
    "penalty": "Order cap reduced by 3",
    "color": "#dc9d63"
  },
  {
    "zone": 4,
    "name": "economic_failure",
    "penalty": "No new resources added",
    "color": "#cf6f78"
  },
  {
    "zone": 5,
    "name": "desertion",
    "penalty": "Remove units equal residual stress, excluding construction and carrier fighters, keep stress",
    "color": "#8d94a2"
  }
];
export const WAR_PROFILES={
  "standard": {
    "name": "Unified command",
    "orders": 9,
    "threshold": 6,
    "pv": 6,
    "pool": {
      "ground": 24,
      "air": 9,
      "naval": 9
    }
  },
  "mobilization": {
    "name": "Provincial mobilization",
    "orders": 6,
    "threshold": 4,
    "pv": 3,
    "pool": {
      "ground": 22,
      "air": 0,
      "naval": 0
    },
    "noFuel": true,
    "noTrade": true,
    "noSeaTransport": true,
    "mobilization": true
  },
  "maritime": {
    "name": "Maritime federation",
    "orders": 9,
    "threshold": 6,
    "pv": 7,
    "pool": {
      "ground": 24,
      "air": 9,
      "naval": 9
    }
  },
  "federation": {
    "name": "Continental federation",
    "orders": 9,
    "threshold": 6,
    "pv": 5,
    "pool": {
      "ground": 28,
      "air": 9,
      "naval": 9
    }
  },
  "democracy": {
    "name": "Industrial republic",
    "orders": 9,
    "threshold": 5,
    "pv": 10,
    "pool": {
      "ground": 24,
      "air": 9,
      "naval": 9
    }
  },
  "industrial": {
    "name": "Central directorate",
    "orders": 9,
    "threshold": 6,
    "pv": 8,
    "pool": {
      "ground": 28,
      "air": 9,
      "naval": 9
    }
  },
  "minor": {
    "name": "Regional command",
    "orders": 6,
    "threshold": 4,
    "pv": 4,
    "pool": {
      "ground": 16,
      "air": 6,
      "naval": 6
    }
  },
  "island": {
    "name": "Archipelago command",
    "orders": 9,
    "threshold": 7,
    "pv": 6,
    "pool": {
      "ground": 24,
      "air": 9,
      "naval": 9
    }
  }
};
export const WAR_SCENARIOS=[
  {
    "id": "world",
    "name": "Planetary coalition war",
    "size": "planetary"
  },
  {
    "id": "continental",
    "name": "Continental intervention",
    "size": "continental"
  },
  {
    "id": "archipelago",
    "name": "Archipelago campaign",
    "size": "continental",
    "climate": "oceanic"
  },
  {
    "id": "coast",
    "name": "Expeditionary corridor",
    "size": "regional"
  },
  {
    "id": "front",
    "name": "Continental front",
    "size": "regional"
  }
];
// Command-pool counts are explicit original adaptation values; their finite function is preserved.
export function unitStance(unit,regionType='land'){const def=WAR_UNITS[unit.type];if(!def)return null;let stance=unit.stance||DEFAULT_STANCES[unit.type];if(unit.type==='strike'&&regionType==='sea')stance='sea';return def.stances[stance]||def.stances[DEFAULT_STANCES[unit.type]];}
export const unitAlive=unit=>!unit.eliminated;
export const unitOperational=unit=>unitAlive(unit)&&!unit.escaped;
export const unitRow=unit=>unit.type+':'+(unit.stance||DEFAULT_STANCES[unit.type]);
export function whiteVulnerable(unit,regionType='land'){if(unit.type==='submersible')return false;const stance=unitStance(unit,regionType);return (unit.type==='cohort'&&unit.stance==='offensive')||unit.damage>=stance.hits-1;}

/*
DATE: true
DATETIME: true
NUMBER: true
TEXTAREA: true
TIME: true
autocomplete: true
cb: true
droplist: true
rautocomplete: true
sdroplist: true
string: true
*/

const scheme = {
  ActorA: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  ActorD: [
    {
      disabled: 'class',
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  SensorA: [
    {
      disabled: 'class',
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  SensorD: [
    {
      disabled: 'class',
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],

  and: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  or: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  if: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: '>',
         
        },
        {
          id: '<',
         
        },
        {
          id: '>=',
         
        },
        {
          id: '<=',
         
        },
        {
          id: '==',
         
        },
        {
          id: '!=',
         
        }
      ],
      prop: 'operator'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  between: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  not: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  device_property: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'text',
      prop: 'dn',
      type: 'smartbutton',
      command: 'dialog',
      params: {
       
        type: 'tree',
        id: 'visitems',
      }
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  now: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'time',
         
        },
        {
          id: 'date',
         
        },
        {
          id: 'date_time',
         
        },
        {
          id: 'day',
         
        },
        {
          id: 'weekday',
         
        },
        {
          id: 'month',
         
        },
        {
          id: 'year',
         
        }
      ],
      prop: 'mode_now'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  timer: [
    {
      disabled: 'class',
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'number',
      prop: 'time',
      bind: false,
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  const: [
    {
      disabled: 'class',
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'number',
         
        },
        {
          id: 'string',
         
        },
        {
          id: 'time',
         
        },
        {
          id: 'date',
         
        },
        {
          id: 'date_time',
         
        },
        {
          id: 'weekday',
         
        }
      ],
      prop: 'mode_const'
    },
    {
     
      type: 'number',
      visible: 'data.mode_const === \'number\'',
      prop: 'value_number',
      bind: false,
    },
    {
     
      type: 'input',
      visible: 'data.mode_const === \'string\'',
      prop: 'value_string'
    },
    {
     
      type: 'input', // 'TIME',
      visible: 'data.mode_const === \'time\'',
      prop: 'value_time'
    },
    {
     
      type: 'input', // 'DATE',
      visible: 'data.mode_const === \'date\'',
      prop: 'value_date'
    },
    {
     
      type: 'input', // 'DATETIME',
      visible: 'data.mode_const === \'date_time\'',
      prop: 'value_date_time'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: '0',
         
        },
        {
          id: '1',
         
        },
        {
          id: '2',
         
        },
        {
          id: '3',
         
        },
        {
          id: '4',
         
        },
        {
          id: '5',
         
        },
        {
          id: '6',
         
        },
        {
          id: '',
         
        }
      ],
      visible: 'data.mode_const === \'weekday\'',
      prop: 'value_weekday'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  device_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'on',
         
        },
        {
          id: 'off',
         
        },
        {
          id: 'toggle',
         
        },
        {
          id: 'turnOnSaveAuto',
         
        },
        {
          id: 'turnOffSaveAuto',
         
        }
      ],
      prop: 'command'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  set_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'smartbutton',
      command: 'dialog',
      params: {
       
        type: 'tree',
        id: 'visitems',
      },
      prop: 'dn'
    },
    {
     
      type: 'number',
      prop: 'value',
      bind: false,
    },
    {
     
      type: 'cb',
      prop: 'assign',
      bind: false,
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  group_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'on',
         
        },
        {
          id: 'off',
         
        },
        {
          id: 'toggle',
         
        },
        {
          id: 'turnOnSaveAuto',
         
        },
        {
          id: 'turnOffSaveAuto',
         
        }
      ],
      prop: 'command'
    },
    {
     
      type: 'input',
      prop: 'gr_subs'
    },
    {
     
      type: 'input',
      prop: 'gr_place'
    },
    {
     
      type: 'input',
      prop: 'gr_room'
    },
    {
     
      type: 'input',
      prop: 'gr_type'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  os_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'input',
      prop: 'text'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  http_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'input',
      prop: 'text'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  info_command: [
    {
      disabled: 'class',
     
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'email',
         
        },
        {
          id: 'p2p',
         
        },
        {
          id: 'telegram',
         
        },
        {
          id: '',
         
        }
      ],
      prop: 'infotype'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'OWNER',
         
        },
        {
          id: 'OTHER',
         
        },
        {
          id: '',
         
        }
      ],
      prop: 'usergroup'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'admin',
         
        },
        {
          id: '',
         
        }
      ],
      visible: '!data.usergroup',
      prop: 'user'
    },
    {
     
      type: 'input',
      prop: 'text'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  snap_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: '102',
         
        },
        {
          id: '103',
         
        },
        {
          id: '104',
         
        },
        {
          id: '105',
         
        },
        {
          id: '107',
         
        },
        {
          id: '110',
         
        },
        {
          id: '',
         
        }
      ],
      prop: 'camera'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  plugin_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'droplist',
      data: [
        {
          id: 'ping1',
         
        },
        {
          id: 'telegram',
         
        },
        {
          id: 'xiaomi1',
         
        },
        {
          id: 'http1',
         
        },
        {
          id: 'pingarp1',
         
        },
        {
          id: 'wakeonlan1',
         
        },
        {
          id: 'xiaomi2',
         
        },
        {
          id: 'p2p',
         
        },
        {
          id: 'email',
         
        },
        {
          id: 'modbus1',
         
        },
        {
          id: 'speech2text',
         
        },
        {
          id: 'cctv',
         
        },
        {
          id: 'snmp1',
         
        },
        {
          id: 'megad1',
         
        },
        {
          id: 'emuls1',
         
        },
        {
          id: 'hwinfo',
         
        },
        {
          id: '',
         
        }
      ],
      prop: 'unit'
    },
    {
     
      type: 'input',
      prop: 'text'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ],
  log_command: [
    {
     
      type: 'text',
      prop: 'class'
    },
    {
     
      type: 'text',
      prop: 'type'
    },
    {
     
      type: 'input',
      prop: 'text'
    },
    {
     
      type: 'input',
      prop: 'comment'
    }
  ]
};


export default scheme;
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
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Устройство',
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  ActorD: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Устройство',
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  SensorA: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Устройство',
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  SensorD: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Устройство',
      type: 'droplist',
      data: 'deviceList',
      prop: 'dn',
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],

  and: [
    {
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  or: [
    {
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  if: [
    {
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Оператор',
      type: 'droplist',
      data: [
        {
          id: '>',
          title: '>'
        },
        {
          id: '<',
          title: '<'
        },
        {
          id: '>=',
          title: '>='
        },
        {
          id: '<=',
          title: '<='
        },
        {
          id: '==',
          title: '=='
        },
        {
          id: '!=',
          title: '!='
        }
      ],
      prop: 'operator'
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  between: [
    {
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  not: [
    {
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  device_property: [
    {
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Устройство',
      type: 'text',
      prop: 'dn',
      type: 'smartbutton',
      command: 'dialog',
      params: {
        title: 'Свойство устройства',
        type: 'tree',
        id: 'visitems',
      }
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  now: [
    {
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Режим',
      type: 'droplist',
      data: [
        {
          id: 'time',
          title: 'Время'
        },
        {
          id: 'date',
          title: 'Дата'
        },
        {
          id: 'date_time',
          title: 'Дата и время'
        },
        {
          id: 'day',
          title: 'День'
        },
        {
          id: 'weekday',
          title: 'День недели'
        },
        {
          id: 'month',
          title: 'Месяц'
        },
        {
          id: 'year',
          title: 'Год'
        }
      ],
      prop: 'mode_now'
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  timer: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Время (сек)',
      type: 'number',
      prop: 'time',
      bind: false,
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  const: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Режим',
      type: 'droplist',
      data: [
        {
          id: 'number',
          title: 'Число'
        },
        {
          id: 'string',
          title: 'Строка'
        },
        {
          id: 'time',
          title: 'Время'
        },
        {
          id: 'date',
          title: 'Дата'
        },
        {
          id: 'date_time',
          title: 'Дата и время'
        },
        {
          id: 'weekday',
          title: 'День недели'
        }
      ],
      prop: 'mode_const'
    },
    {
      title: 'Число',
      type: 'number',
      visible: 'data.mode_const === \'number\'',
      prop: 'value_number',
      bind: false,
    },
    {
      title: 'Строка',
      type: 'input',
      visible: 'data.mode_const === \'string\'',
      prop: 'value_string'
    },
    {
      title: 'Время',
      type: 'input', // 'TIME',
      visible: 'data.mode_const === \'time\'',
      prop: 'value_time'
    },
    {
      title: 'Дата',
      type: 'input', // 'DATE',
      visible: 'data.mode_const === \'date\'',
      prop: 'value_date'
    },
    {
      title: 'Дата и время',
      type: 'input', // 'DATETIME',
      visible: 'data.mode_const === \'date_time\'',
      prop: 'value_date_time'
    },
    {
      title: 'День недели',
      type: 'droplist',
      data: [
        {
          id: '0',
          title: 'Воскресенье'
        },
        {
          id: '1',
          title: 'Понедельник'
        },
        {
          id: '2',
          title: 'Вторник'
        },
        {
          id: '3',
          title: 'Среда'
        },
        {
          id: '4',
          title: 'Четверг'
        },
        {
          id: '5',
          title: 'Пятница'
        },
        {
          id: '6',
          title: 'Суббота'
        },
        {
          id: '',
          title: '-'
        }
      ],
      visible: 'data.mode_const === \'weekday\'',
      prop: 'value_weekday'
    },
    {
      title: 'Комментарий',
      type: 'input',
      prop: 'comment'
    }
  ],
  device_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tablename: 'devicesfordiagram'
      },
      prop: 'dn'
    },
    {
      title: 'Команда',
      type: 'autocomplete',
      data: [
        {
          id: 'on',
          title: 'ON'
        },
        {
          id: 'off',
          title: 'OFF'
        },
        {
          id: 'toggle',
          title: 'TOGGLE'
        },
        {
          id: 'turnOnSaveAuto',
          title: 'ON save Auto'
        },
        {
          id: 'turnOffSaveAuto',
          title: 'OFF save Auto'
        }
      ],
      prop: 'command'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  set_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tablename: 'devicesfordiagram'
      },
      prop: 'dn'
    },
    {
      title: 'Свойство',
      type: 'STRING',
      prop: 'prop'
    },
    {
      title: 'Значение',
      type: 'NUMBER',
      prop: 'value'
    },
    {
      title: 'Присвоить виртуально без проверки (assign)',
      type: 'cb',
      prop: 'assign'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  group_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Команда',
      type: 'autocomplete',
      data: [
        {
          id: 'on',
          title: 'ON'
        },
        {
          id: 'off',
          title: 'OFF'
        },
        {
          id: 'toggle',
          title: 'TOGGLE'
        },
        {
          id: 'turnOnSaveAuto',
          title: 'ON save Auto'
        },
        {
          id: 'turnOffSaveAuto',
          title: 'OFF save Auto'
        }
      ],
      prop: 'command'
    },
    {
      title: 'Подсистемы',
      type: 'sdroplist',
      data: {
        tablename: 'subsystems'
      },
      prop: 'gr_subs'
    },
    {
      title: 'Уровни',
      type: 'sdroplist',
      data: {
        tablename: 'places'
      },
      prop: 'gr_place'
    },
    {
      title: 'Зоны',
      type: 'sdroplist',
      data: {
        tablename: 'rooms'
      },
      prop: 'gr_room'
    },
    {
      title: 'Тип устройства',
      type: 'sdroplist',
      data: {
        tablename: 'types'
      },
      prop: 'gr_type'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  os_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA',
      prop: 'text'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  http_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA',
      prop: 'text'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  info_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Канал информирования',
      type: 'droplist',
      data: [
        {
          id: 'email',
          title: 'email'
        },
        {
          id: 'p2p',
          title: 'p2p'
        },
        {
          id: 'telegram',
          title: 'telegram'
        },
        {
          id: '',
          title: '-'
        }
      ],
      prop: 'infotype'
    },
    {
      title: 'Группа',
      type: 'droplist',
      data: [
        {
          id: 'OWNER',
          title: 'OWNER'
        },
        {
          id: 'OTHER',
          title: 'OTHER'
        },
        {
          id: '',
          title: '-'
        }
      ],
      prop: 'usergroup'
    },
    {
      title: 'Пользователь',
      type: 'droplist',
      data: [
        {
          id: 'admin',
          title: 'admin'
        },
        {
          id: '',
          title: '-'
        }
      ],
      visible: '!data.usergroup',
      prop: 'user'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA',
      prop: 'text'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  snap_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Камера',
      type: 'droplist',
      data: [
        {
          id: '102',
          title: 'HI RTSP/MJPEG'
        },
        {
          id: '103',
          title: 'HI HTTP/MJPEG'
        },
        {
          id: '104',
          title: 'HI HTTP/JPEG'
        },
        {
          id: '105',
          title: 'HI RTSP/H264'
        },
        {
          id: '107',
          title: '111'
        },
        {
          id: '110',
          title: '222'
        },
        {
          id: '',
          title: '-'
        }
      ],
      prop: 'camera'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  plugin_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Плагин',
      type: 'droplist',
      data: [
        {
          id: 'ping1',
          title: 'ping1'
        },
        {
          id: 'telegram',
          title: 'telegram'
        },
        {
          id: 'xiaomi1',
          title: 'xiaomi1'
        },
        {
          id: 'http1',
          title: 'http1'
        },
        {
          id: 'pingarp1',
          title: 'pingarp1'
        },
        {
          id: 'wakeonlan1',
          title: 'wakeonlan1'
        },
        {
          id: 'xiaomi2',
          title: 'xiaomi2'
        },
        {
          id: 'p2p',
          title: 'p2p'
        },
        {
          id: 'email',
          title: 'email'
        },
        {
          id: 'modbus1',
          title: 'modbus1'
        },
        {
          id: 'speech2text',
          title: 'speech2text'
        },
        {
          id: 'cctv',
          title: 'cctv'
        },
        {
          id: 'snmp1',
          title: 'snmp1'
        },
        {
          id: 'megad1',
          title: 'megad1'
        },
        {
          id: 'emuls1',
          title: 'emuls1'
        },
        {
          id: 'hwinfo',
          title: 'hwinfo'
        },
        {
          id: '',
          title: '-'
        }
      ],
      prop: 'unit'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA',
      prop: 'text'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ],
  log_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'text',
      prop: 'class'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'text',
      prop: 'type'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA',
      prop: 'text'
    },
    {
      title: 'Комментарий',
      type: 'STRING',
      prop: 'comment'
    }
  ]
};


export default scheme;
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
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'devicesfordiagram'
      }
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  ActorD: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'devicesfordiagram'
      }
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  SensorA: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'devicesfordiagram'
      }
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  SensorD: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'devicesfordiagram'
      }
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  and: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  or: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  'if': [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Оператор',
      type: 'autocomplete',
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
      ]
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  between: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  not: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  device_property: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'devicesfordiagram'
      }
    },
    {
      title: 'Свойство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'deviceproperties',
        filter: {
          key: 'dn',
          value: 'data.dn'
        }
      }
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  now: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Режим',
      type: 'autocomplete',
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
      ]
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  timer: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Время (сек)',
      type: 'NUMBER'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  const: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Режим',
      type: 'autocomplete',
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
      ]
    },
    {
      title: 'Значение',
      type: 'NUMBER',
      visible: 'data.mode_const === \'number\''
    },
    {
      title: 'Значение',
      type: 'TIME',
      visible: 'data.mode_const === \'time\''
    },
    {
      title: 'Значение',
      type: 'DATE',
      visible: 'data.mode_const === \'date\''
    },
    {
      title: 'Значение',
      type: 'DATETIME',
      visible: 'data.mode_const === \'date_time\''
    },
    {
      title: 'Значение',
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
      visible: 'data.mode_const === \'weekday\''
    },
    {
      title: 'Значение',
      type: 'string',
      visible: 'data.mode_const === \'string\''
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  device_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'devicesfordiagram'
      }
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
      ]
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  set_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Устройство',
      type: 'rautocomplete',
      data: {
        tabletitle: 'devicesfordiagram'
      }
    },
    {
      title: 'Свойство',
      type: 'string'
    },
    {
      title: 'Значение',
      type: 'NUMBER'
    },
    {
      title: 'Присвоить виртуально без проверки (assign)',
      type: 'cb'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  group_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
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
      ]
    },
    {
      title: 'Подсистемы',
      type: 'sdroplist',
      data: {
        tabletitle: 'subsystems'
      }
    },
    {
      title: 'Уровни',
      type: 'sdroplist',
      data: {
        tabletitle: 'places'
      }
    },
    {
      title: 'Зоны',
      type: 'sdroplist',
      data: {
        tabletitle: 'rooms'
      }
    },
    {
      title: 'Тип устройства',
      type: 'sdroplist',
      data: {
        tabletitle: 'types'
      }
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  os_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  http_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  info_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA'
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
      ]
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
      ]
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
      visible: '!data.usergroup'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  snap_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
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
      ]
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  plugin_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA'
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
      ]
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ],
  log_command: [
    {
      disabled: 'class',
      title: 'Класс',
      type: 'string'
    },
    {
      disabled: 'type',
      title: 'Тип',
      type: 'string'
    },
    {
      title: 'Текст',
      type: 'TEXTAREA'
    },
    {
      title: 'Комментарий',
      type: 'string'
    }
  ]
};


export default scheme;
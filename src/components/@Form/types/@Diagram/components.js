const components = {
  ActorA: {
    params: {
      type: 'ActorA',
      class: { value: 'device' },
      dn: { id: '-', title: '-' },
      mode: 'trigger',
      style: {
        width: 168,
        height: 116
      },
      text_size: 0,
      comment: { value: ''},
      component: 'ActorA'
    },
    in: [],
    out: [
      {
        label: 'ON',
        portname: 'on',
        max: 0
      },
      {
        label: 'OFF',
        portname: 'off',
        max: 0
      },
      {
        label: 'VALUE',
        portname: 'value',
        max: 0
      },
      {
        label: 'AUTO',
        portname: 'auto',
        max: 0
      }
    ]
  },
  ActorD: {
    params: {
      type: 'ActorD',
      class: { value: 'device' },
      dn: { id: '-', title: '-' },
      mode: 'trigger',
      style: {
        width: 168,
        height: 116
      },
      text_size: 0,
      comment: { value: ''},
      component: 'ActorD'
    },
    in: [],
    out: [
      {
        label: 'ON',
        portname: 'on',
        max: 0
      },
      {
        label: 'OFF',
        portname: 'off',
        max: 0
      },
      {
        label: 'AUTO',
        portname: 'auto',
        max: 0
      }
    ]
  },
  SensorA: {
    params: {
      type: 'SensorA',
      class: { value: 'device' },
      dn: { id: '-', title: '-' },
      mode: 'trigger',
      style: {
        width: 168,
        height: 116
      },
      text_size: 0,
      comment: { value: ''},
      component: 'SensorA'
    },
    in: [],
    out: [
      {
        label: 'VALUE',
        portname: 'value',
        max: 0
      },
      {
        label: 'SETPOINT',
        portname: 'setpoint',
        max: 0
      },
      {
        label: 'ERROR',
        portname: 'error',
        max: 0
      }
    ]
  },
  SensorD: {
    params: {
      type: 'SensorD',
      class: { value: 'device' },
      dn: { id: '-', title: '-' },
      mode: 'trigger',
      style: {
        width: 168,
        height: 116
      },
      text_size: 0,
      comment: { value: ''},
      component: 'SensorD'
    },
    in: [],
    out: [
      {
        label: 'ON',
        portname: 'on',
        max: 0
      },
      {
        label: 'OFF',
        portname: 'off',
        max: 0
      },
      {
        label: 'BLK',
        portname: 'blk',
        max: 0
      },
      {
        label: 'ERROR',
        portname: 'error',
        max: 0
      }
    ]
  },
  and: {
    params: {
      class: 'operation',
      type: 'and',
      style: {
        width: 115,
        height: 48
      },
      color: '#2196F380',
      text_size: 0,
      comment: { value: ''},
      component: 'AND'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  or: {
    params: {
      class: 'operation',
      type: 'or',
      style: {
        width: 115,
        height: 48
      },
      color: '#2196F380',
      text_size: 0,
      comment: { value: ''},
      component: 'OR'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  if: {
    params: {
      class: 'operation',
      type: 'if',
      operator: { id: '>', title: '>' },
      style: {
        width: 115,
        height: 73
      },
      color: '#2196F380',
      text_size: 0,
      comment: { value: ''},
      component: 'IF'
    },
    in: [
      {
        label: 'A',
        portname: 'a',
        max: 1
      },
      {
        label: 'B',
        portname: 'b',
        max: 1
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 1
      }
    ]
  },
  between: {
    params: {
      class: 'operation',
      type: 'between',
      style: {
        width: 115,
        height: 94
      },
      color: '#2196F380',
      text_size: 0,
      comment: { value: ''},
      component: 'BETWEEN'
    },
    in: [
      {
        label: 'A',
        portname: 'a',
        max: 1
      },
      {
        label: 'B',
        portname: 'b',
        max: 1
      },
      {
        label: 'C',
        portname: 'c',
        max: 1
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 1
      }
    ]
  },
  not: {
    params: {
      class: 'operation',
      type: 'not',
      style: {
        width: 115,
        height: 48
      },
      color: '#2196F380',
      text_size: 0,
      comment: { value: ''},
      component: 'NOT'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 1
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 1
      }
    ]
  },
  device_property: {
    params: {
      class: 'operation',
      type: 'device_property',
      dn: '',
      property: '',
      style: {
        width: 200,
        height: 70
      },
      color: '#ffc10780',
      text_size: 16,
      comment: { value: ''},
      component: 'Device property'
    },
    in: [],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  now: {
    params: {
      class: 'operation',
      type: 'now',
      mode_now: { id: 'time', title: 'Время'},
      style: {
        width: 160,
        height: 48
      },
      color: '#9E9E9E80',
      text_size: 0,
      comment: { value: ''},
      component: 'NOW'
    },
    in: [],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 1
      }
    ]
  },
  timer: {
    params: {
      class: 'operation',
      type: 'timer',
      style: {
        width: 115,
        height: 70
      },
      time: { value: 10 },
      color: '#673AB780',
      text_size: 16,
      comment: { value: ''},
      component: 'TIMER'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 1
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  const: {
    params: {
      class: 'operation',
      type: 'const',
      style: {
        width: 200,
        height: 48
      },
      mode_const: { id: 'number', title: 'Число' },
      value_number: { value: 5 },
      value_string: { value: '' },
      value_time: { value: '12:00' },
      value_date: { value: '2019-01-01' },
      value_date_time: { value: '2019-01-01 12:00' },
      value_weekday: { id: '0', title: 'Воскресенье' },
      color: '#9E9E9E80',
      text_size: 16,
      comment: { value: ''},
      component: 'CONSTANT'
    },
    in: [],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  device_command: {
    params: {
      class: 'command',
      type: 'device_command',
      dn: { id: '-', title: '-' },
      command: { id: 'on', title: 'ON' },
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  set_command: {
    params: {
      class: 'command',
      type: 'set_command',
      dn: {},
      value: { value: 0 },
      assign: { value: false },
      prop: 'value',
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  group_command: {
    params: {
      class: 'command',
      type: 'group_command',
      command: { id: '-', title: '-' },
      gr_subs: { value: '' },
      gr_place: { value: '' },
      gr_room: { value: '' },
      gr_type: { value: '' },
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  os_command: {
    params: {
      class: 'command',
      type: 'os_command',
      text: { value: ''},
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  http_command: {
    params: {
      class: 'command',
      type: 'http_command',
      text: { value: ''},
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  info_command: {
    params: {
      class: 'command',
      type: 'info_command',
      infotype: { id: '-', title: '-'},
      usergroup: { id: '-', title: '-'},
      user: { id: '-', title: '-'},
      text: { value: ''},
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  snap_command: {
    params: {
      class: 'command',
      type: 'snap_command',
      camera: { id: '-', title: '-' },
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  plugin_command: {
    params: {
      class: 'command',
      type: 'plugin_command',
      unit: { id: '-', title: '-' },
      text: { value: '' },
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  },
  log_command: {
    params: {
      class: 'command',
      type: 'log_command',
      text: { value: ''},
      style: {
        width: 336,
        height: 70
      },
      color: '#53EA5A80',
      text_size: 16,
      comment: { value: ''},
      component: 'Device command'
    },
    in: [
      {
        label: ' ',
        portname: 'in',
        max: 0
      }
    ],
    out: [
      {
        label: ' ',
        portname: 'out',
        max: 0
      }
    ]
  }
}

export default components;
import moment from 'moment';

function getConstLabel(params) {
  switch (params.mode_const) {
    case 'string':
      return String(params.value_string);
    case 'number':
      return String(params.value_number);
    case 'time':
      return params.value_time;
    case 'date':
      return moment(params.value_date).format('DD-MM-YYYY');
    case 'date_time':
      return moment(params.value_date_time).format('DD-MM-YYYY HH:mm');
    case 'weekday':
      return params.label_value_weekday || '';
    default:
      return '';
  }
}

function getHeight(params) {
  if (params.ports_out !== undefined && params.ports_out !== undefined) {
    return 60 + (params.ports_out.length * 20);
  }
  return 116;
}

function getBlockSettings(component, settings) {
  switch (component.params.type) {
    case 'ActorA':
    case 'ActorD':
    case 'SensorA':
    case 'SensorD':
      return {
        params: {
          ...component.params,
          style: {
            ...component.params.style,
          },
          render: {
            L1: component.params.component,
            L2: component.params.dn.title,
            T0: '',
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.mode === 'trigger' ? '#f4433680' : '#ffc10780',
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'and':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: 'AND',
            T0: '',
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'or':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: 'OR',
            T0: '',
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'if':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: `A ${component.params.operator.title} B`,
            T0: '',
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'between':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: 'A < B < C',
            T0: '',
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'not':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: 'NOT',
            T0: '',
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'timer':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: 'TIMER',
            T0: component.params.time.value,
            T1: 'sec',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'now':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: 'NOW',
            T0: component.params.mode_now.title.toUpperCase(),
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'const':
      return {
        params: {
          ...component.params,
          render: {
            L1: 'Operation',
            L2: 'CONSTANT',
            T0: getConstLabel(component.params).toUpperCase(),
            T1: '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'device_property':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'PROPERTY',
            T0:  component.params.dn.result && component.params.dn.result.value ?  component.params.dn.result.value.prop : '',
            T1: component.params.dn.result && component.params.dn.result.value ?  component.params.dn.result.value.did : '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'device_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'ACTION',
            T0: component.params.command ? component.params.command.title.toUpperCase() : '',
            T1: component.params.dn.title,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'set_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'SET',
            T0: `${component.params.dn.result && component.params.dn.result.value ?  component.params.dn.result.value.prop : ''}: ${component.params.value.value}`.toUpperCase(),
            T1: component.params.dn.result && component.params.dn.result.value ?  component.params.dn.result.value.did.toUpperCase() : '',
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'info_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'INFO',
            T0: `${component.params.infotype.title || ''}: ${component.params.usergroup.id === '-' ? component.params.user.title || '' : component.params.usergroup.title || ''}`,
            T1: component.params.text.value,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'plugin_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'PLUGIN',
            T0: component.params.unit.title,
            T1: component.params.text.value,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'group_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'ALL',
            T0: component.params.command ? component.params.command.title.toUpperCase() : '',
            T1: `${component.params.gr_subs.value || ''} ${component.params.gr_place.value || ''} ${component.params.gr_room.value || ''} ${component.params.label_gr_type || ''}`,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'log_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'LOG',
            T0: '',
            T1: component.params.text.value,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'os_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'EXEC',
            T0: '',
            T1: component.params.text.value,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'snap_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'SNAPSHOT',
            T0: '',
            T1: component.params.camera.title,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    case 'http_command':
      return {
        params: {
          ...component.params,
          render: {
            L1: component.params.component,
            L2: 'HTTP',
            T0: '',
            T1: component.params.text.value,
            STYLE_T1: { fontSize: component.params.text_size },
          },
        },
        color: component.params.color,
        in: component.in,
        out: component.out,
        ...settings,
      };
    default:
      return {
        params: {
          ...component.params,
          render: {
            L1: 'ERROR TYPE',
            L2: ' ',
            T0: '',
            T1: 'UNDEFINED',
            STYLE_T1: { fontSize: 16 },
          },
        },
        color: '#9e9e9e80',
        in: [],
        out: [],
        ...settings,
      };
  }
}


export default getBlockSettings;

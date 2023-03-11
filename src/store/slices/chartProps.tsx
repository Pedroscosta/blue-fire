import { lens } from '@dhmk/zustand-lens';
import { ChartPropertiesRegister, ChartPropertyType } from 'bluefire';

interface State {
  state: Record<string, ChartPropertiesRegister>;
}

interface Actions {
  registerProps: (type: string, props: ChartPropertiesRegister) => void;
}

const initialState: State = {
  state: {
    'bf:base-chart': {
      general: {
        title: 'General',
        groups: [
          {
            title: 'Title',
            properties: {
              'chart-title': {
                name: 'Title',
                desc: 'Chart title (leave empty for no title)',
                type: ChartPropertyType.TEXT,
              },
            },
          },
        ],
      },
    },
  },
};

export default lens<State & Actions>((set) => {
  return {
    ...initialState,

    registerProps: (type: string, props: ChartPropertiesRegister) => {
      set((draft) => {
        draft.state[type] = props;
      });
    },
  };
});

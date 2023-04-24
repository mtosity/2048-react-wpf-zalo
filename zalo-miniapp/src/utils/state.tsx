export interface BoxInt {
  title: number;
  com_ani: boolean;
}

export interface StateInt {
  gameOver: boolean
  boxes: Array<Array<BoxInt>>;
}

export const box: BoxInt = {
  title: 0,
  com_ani: false //combined animation
};

export const box2: BoxInt = {
  title: 2,
  com_ani: false //combined animation
};

export const state: StateInt = {
  gameOver: false,
  boxes: [
    [
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      }
    ],
    [
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      }
    ],
    [
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      }
    ],
    [
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      },
      {
        title: 0,
        com_ani: false
      }
    ]
  ]
};

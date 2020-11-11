import { PeoplePageDispaType } from "../../models/dataModels";

export const personCardConfig = {
  stylesConfigs: {
    [PeoplePageDispaType.list]: {
      width: 235,
      height: 35,
      gap: 8,

      userInfoMargin: 25,
    },
    [PeoplePageDispaType.cards]: {
      width: 250,
      height: 216,
      horizontalGap: 12,
      verticalGap: 14,
    },
  },
  selectedCardStyle(wrapper) {
    return {
      width: "auto",
      left: "6%",
      right: "6%",
      top: 15 + ((wrapper || {}).scrollTop || 0),
      height: "auto",
      zIndex: 6,
      maxHeight: 'calc(100% - 20px)'
    };
  },
  shouldRecalculateStyle(nextProps, prevState) {
    const { displayType, index, wrapperWidth } = nextProps;
    const { styleConditions } = prevState;

    return (
      displayType !== styleConditions.displayType ||
      index !== styleConditions.index ||
      (displayType === PeoplePageDispaType.cards &&
        wrapperWidth !== styleConditions.wrapperWidth)
    );
  },

  recalculateStyle(nextProps) {
    const { displayType, index, wrapperWidth } = nextProps;
    if (displayType === PeoplePageDispaType.list) {
      const { width, height, gap } = this.stylesConfigs[
        PeoplePageDispaType.list
      ];
      return {
        top: (height + gap) * index,
        left: 0,
        width,
        height,
      };
    } else {
      const { width, height, horizontalGap, verticalGap } = this.stylesConfigs[
        PeoplePageDispaType.cards
      ];

      const cardSpace = width + horizontalGap;

      const itemsPreRow = Math.floor(wrapperWidth / cardSpace);
      const rowUsableWidth = itemsPreRow * cardSpace;
      const totalLeftWidth = index * cardSpace;
      const row = Math.floor(totalLeftWidth / rowUsableWidth);

      const top = row * (height + verticalGap);
      const left = totalLeftWidth - row * rowUsableWidth;

      return {
        top: top,
        left: left,
        width,
        height,
        marginBottom: verticalGap,
      };
    }
  },
};

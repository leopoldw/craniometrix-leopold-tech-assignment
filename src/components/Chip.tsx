import { PlayerOrNullType  } from "../types"

export const getColorForPlayer = (player: PlayerOrNullType) => {
    switch (player) {
      case "Y":
        return "bg-yellow-300";
      case "R":
        return "bg-red-500";
      default:
        return "bg-white";
    }
  };
  

type ChipProps = {
    player: PlayerOrNullType
}

const Chip = ({ player }: ChipProps) => (
    <div className={`w-[75px] h-[75px] ${getColorForPlayer(player)} rounded-[100%]`} />
)

export default Chip
package aggregator

import (
	"github.com/bluzelle/curium/app/ante/gasmeter"
	"github.com/bluzelle/curium/x/aggregator/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func EndBlocker(ctx sdk.Context, k keeper.Keeper) {
	k.AggregateValues(ctx.WithGasMeter(gasmeter.NewFreeGasMeter(0)))
}
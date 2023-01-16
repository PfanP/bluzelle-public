package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/bluzelle/bluzelle/curium/testutil/keeper"
	"github.com/bluzelle/bluzelle/curium/x/curium/keeper"
	"github.com/bluzelle/bluzelle/curium/x/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.CuriumKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}

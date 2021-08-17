package keeper

import (
	"github.com/bluzelle/curium/x/aggregator/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	// this line is used by starport scaffolding # 1
	abci "github.com/tendermint/tendermint/abci/types"
)

// NewQuerier creates a new querier for aggregator clients.
func NewQuerier(k Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		switch path[0] {
		case types.QueryParams:
			return queryParams(ctx, k)
		case types.QuerySearchValues:
			return querySearchValues(ctx, req, k)
		case types.QuerySearchBatchKeys:
			return querySearchBatchKeys(ctx, req, k)
		case types.QueryGetLatestValues:
			return queryGetLatestValues(ctx, req, k)
		case types.QueryGetPairValues:
			return queryGetPairValues(ctx, req, k)
		case types.QueryGetAggregatedValue:
			return queryGetAggregatedValue(ctx, req, k)
		case types.QueryGetPairValuesHistory:
			return queryGetPairValuesHistory(ctx, req, k)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown aggregator query endpoint")
		}
	}
}

func queryGetPairValues(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	args := types.RestLatestPairReq{}
	k.cdc.MustUnmarshalBinaryBare(req.Data, &args)
	latestValues, err := queryGetLatestValues(ctx, req, k)

	var allPairs []types.AggregatorValue

	if err != nil {
		return nil, err
	}
	k.cdc.MustUnmarshalJSON(latestValues, &allPairs)

	for _, pair := range allPairs {
		if pair.Symbol == args.Symbol && pair.InSymbol == args.InSymbol {
			return k.cdc.MustMarshalJSON(pair), nil
		}
	}
	return nil, nil
}

func queryGetLatestValues(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	batches := k.SearchAggValueBatchKeys(ctx, "", 1, true)
	values := k.SearchValues(ctx, batches[0], 1, 100, false)
	x := k.cdc.MustMarshalJSON(values)
	return x, nil
}

func querySearchValues(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.QueryReqSearchValues
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchValues(ctx, query.Prefix, query.Page, query.Limit, query.Reverse)
	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}

func queryGetAggregatedValue(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.QueryReqGetAggregatorValue
	k.cdc.MustUnmarshalJSON(req.Data, &query)
	results := k.GetAggregatedValue(ctx, query.Batch, query.Pair)
	return k.cdc.MustMarshalJSON(results), nil
}

func querySearchBatchKeys(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.QueryReqSearchBatches
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.SearchAggValueBatchKeys(ctx, query.PreviousBatch, query.Limit, query.Reverse)

	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}


func queryParams(ctx sdk.Context, k Keeper) ([]byte, error) {
	params := k.GetParams(ctx)

	res, err := codec.MarshalJSONIndent(types.ModuleCdc, params)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONMarshal, err.Error())
	}

	return res, nil
}

func queryGetPairValuesHistory(ctx sdk.Context, req abci.RequestQuery, k Keeper) ([]byte, error) {
	var query types.QueryReqGetPairValuesHistory
	k.cdc.MustUnmarshalJSON(req.Data, &query)

	results := k.GetPairValuesHistory(ctx, query.StartBatch, query.EndBatch, query.Step, query.Symbol, query.InSymbol)
	x := codec.MustMarshalJSONIndent(k.cdc, results)
	return x, nil
}

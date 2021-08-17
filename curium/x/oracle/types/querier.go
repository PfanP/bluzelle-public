package types

import sdk "github.com/cosmos/cosmos-sdk/types"

const (
	QueryListSources = "listsources"
	QuerySearchVotes = "searchvotes"
	QuerySearchVoteProofs = "searchProofs"
	QuerySearchVoteKeys = "searchvotekeys"
	QuerySearchSourceValues = "searchSourceValues"
	QueryConfig = "getConfig"
	QueryValidatorByValcons = "validatorByValcons"
)

type QueryResultListSources = []struct{
	Name string
	Url string
	Property string
	Owner sdk.AccAddress
}

type QueryResultConfig = struct{
	AdminAddress sdk.AccAddress
}

type ValidatorByValconsQueryRequest = struct {
	Valcons string
}

type SearchVotesQueryRequest = struct{
	Prefix string
}

type SearchVoteProofsQueryRequest = struct {
	Prefix string
}

type SearchSourceValuesQueryRequest = struct{
	Prefix string
	Reverse bool
	Page uint
	Limit uint
}


type CalculateProofSigQueryRequest = struct {
	Valcons string
	Value string
}
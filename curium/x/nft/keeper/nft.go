package keeper

import (
	"encoding/binary"
	"github.com/bluzelle/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// AppendNft appends a nft in the store with a new id and update the count
func (k Keeper) AppendNft(
	ctx sdk.Context,
	creator string,
	id string,
	hash string,
	vendor string,
	userId string,
	meta string,
	mime string,

) {
	// Create the nft
	var nft = types.Nft{
		Creator: creator,
		Id:      id,
		Vendor: vendor,
		UserId: userId,
		Hash:    hash,
		Meta:    meta,
		Mime:    mime,
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	value := k.Cdc.MustMarshalBinaryBare(&nft)
	store.Set(GetNftIDBytes(nft.Id), value)
}

// SetNft set a specific nft in the store
func (k Keeper) SetNft(ctx sdk.Context, nft types.Nft) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	b := k.Cdc.MustMarshalBinaryBare(&nft)
	store.Set(GetNftIDBytes(nft.Id), b)
}

// GetNft returns a nft from its id
func (k Keeper) GetNft(ctx sdk.Context, id string) types.Nft {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	var nft types.Nft
	k.Cdc.MustUnmarshalBinaryBare(store.Get(GetNftIDBytes(id)), &nft)
	return nft
}

// HasNft checks if the nft exists in the store
func (k Keeper) HasNft(ctx sdk.Context, id string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	return store.Has(GetNftIDBytes(id))
}

// GetNftOwner returns the creator of the nft
func (k Keeper) GetNftOwner(ctx sdk.Context, id string) string {
	return k.GetNft(ctx, id).Creator
}

// RemoveNft removes a nft from the store
func (k Keeper) RemoveNft(ctx sdk.Context, id string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	store.Delete(GetNftIDBytes(id))
}

// GetAllNft returns all nft
func (k Keeper) GetAllNft(ctx sdk.Context) (list []types.Nft) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Nft
		k.Cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetNftIDBytes returns the byte representation of the ID
func GetNftIDBytes(id string) []byte {
	return []byte(id)
}

// GetNftIDFromBytes returns ID in uint32 format from a byte array
func GetNftIDFromBytes(bz []byte) uint32 {
	return binary.BigEndian.Uint32(bz)
}

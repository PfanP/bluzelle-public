// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: tax/query.proto

package types

import (
	context "context"
	fmt "fmt"
	_ "github.com/cosmos/cosmos-sdk/types/query"
	_ "github.com/gogo/protobuf/gogoproto"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type QueryGetTaxInfoRequest struct {
}

func (m *QueryGetTaxInfoRequest) Reset()         { *m = QueryGetTaxInfoRequest{} }
func (m *QueryGetTaxInfoRequest) String() string { return proto.CompactTextString(m) }
func (*QueryGetTaxInfoRequest) ProtoMessage()    {}
func (*QueryGetTaxInfoRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_c7620848389f966a, []int{0}
}
func (m *QueryGetTaxInfoRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryGetTaxInfoRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryGetTaxInfoRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryGetTaxInfoRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryGetTaxInfoRequest.Merge(m, src)
}
func (m *QueryGetTaxInfoRequest) XXX_Size() int {
	return m.Size()
}
func (m *QueryGetTaxInfoRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryGetTaxInfoRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryGetTaxInfoRequest proto.InternalMessageInfo

type QueryGetTaxInfoResponse struct {
	GasTaxBp      int64  `protobuf:"varint,1,opt,name=gasTaxBp,proto3" json:"gasTaxBp,omitempty"`
	TransferTaxBp int64  `protobuf:"varint,2,opt,name=transferTaxBp,proto3" json:"transferTaxBp,omitempty"`
	TaxCollector  string `protobuf:"bytes,3,opt,name=taxCollector,proto3" json:"taxCollector,omitempty"`
}

func (m *QueryGetTaxInfoResponse) Reset()         { *m = QueryGetTaxInfoResponse{} }
func (m *QueryGetTaxInfoResponse) String() string { return proto.CompactTextString(m) }
func (*QueryGetTaxInfoResponse) ProtoMessage()    {}
func (*QueryGetTaxInfoResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_c7620848389f966a, []int{1}
}
func (m *QueryGetTaxInfoResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryGetTaxInfoResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryGetTaxInfoResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryGetTaxInfoResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryGetTaxInfoResponse.Merge(m, src)
}
func (m *QueryGetTaxInfoResponse) XXX_Size() int {
	return m.Size()
}
func (m *QueryGetTaxInfoResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryGetTaxInfoResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryGetTaxInfoResponse proto.InternalMessageInfo

func (m *QueryGetTaxInfoResponse) GetGasTaxBp() int64 {
	if m != nil {
		return m.GasTaxBp
	}
	return 0
}

func (m *QueryGetTaxInfoResponse) GetTransferTaxBp() int64 {
	if m != nil {
		return m.TransferTaxBp
	}
	return 0
}

func (m *QueryGetTaxInfoResponse) GetTaxCollector() string {
	if m != nil {
		return m.TaxCollector
	}
	return ""
}

func init() {
	proto.RegisterType((*QueryGetTaxInfoRequest)(nil), "bluzelle.curium.tax.QueryGetTaxInfoRequest")
	proto.RegisterType((*QueryGetTaxInfoResponse)(nil), "bluzelle.curium.tax.QueryGetTaxInfoResponse")
}

func init() { proto.RegisterFile("tax/query.proto", fileDescriptor_c7620848389f966a) }

var fileDescriptor_c7620848389f966a = []byte{
	// 342 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x91, 0xcf, 0x4a, 0xc3, 0x40,
	0x10, 0xc6, 0xbb, 0x2d, 0x8a, 0x2e, 0x8a, 0x10, 0x45, 0x4b, 0x90, 0x50, 0xa3, 0x48, 0xfd, 0x43,
	0x96, 0xea, 0x0b, 0x48, 0x3d, 0x88, 0x47, 0x4b, 0x4f, 0x5e, 0xca, 0x26, 0x4c, 0xd7, 0x40, 0xba,
	0x93, 0x66, 0x27, 0x92, 0x7a, 0x11, 0x7c, 0x02, 0xd1, 0xab, 0x0f, 0xe4, 0xb1, 0xe0, 0xc5, 0xa3,
	0xb4, 0x3e, 0x88, 0x34, 0xf1, 0x0f, 0xa5, 0x3d, 0x78, 0xdb, 0x9d, 0xef, 0x37, 0xb3, 0xf3, 0xed,
	0xc7, 0xd7, 0x48, 0x66, 0xa2, 0x9f, 0x42, 0x32, 0xf0, 0xe2, 0x04, 0x09, 0xad, 0x75, 0x3f, 0x4a,
	0xef, 0x20, 0x8a, 0xc0, 0x0b, 0xd2, 0x24, 0x4c, 0x7b, 0x1e, 0xc9, 0xcc, 0xde, 0x50, 0xa8, 0x30,
	0xd7, 0xc5, 0xe4, 0x54, 0xa0, 0xf6, 0xb6, 0x42, 0x54, 0x11, 0x08, 0x19, 0x87, 0x42, 0x6a, 0x8d,
	0x24, 0x29, 0x44, 0x6d, 0xbe, 0xd5, 0xc3, 0x00, 0x4d, 0x0f, 0x8d, 0xf0, 0xa5, 0x81, 0xe2, 0x05,
	0x71, 0xdb, 0xf0, 0x81, 0x64, 0x43, 0xc4, 0x52, 0x85, 0x3a, 0x87, 0x0b, 0xd6, 0xad, 0xf2, 0xcd,
	0xab, 0x09, 0x71, 0x01, 0xd4, 0x96, 0xd9, 0xa5, 0xee, 0x62, 0x0b, 0xfa, 0x29, 0x18, 0x72, 0xef,
	0xf9, 0xd6, 0x8c, 0x62, 0x62, 0xd4, 0x06, 0x2c, 0x9b, 0x2f, 0x29, 0x69, 0xda, 0x32, 0x6b, 0xc6,
	0x55, 0x56, 0x63, 0xf5, 0x4a, 0xeb, 0xf7, 0x6e, 0xed, 0xf1, 0x55, 0x4a, 0xa4, 0x36, 0x5d, 0x48,
	0x0a, 0xa0, 0x9c, 0x03, 0xd3, 0x45, 0xcb, 0xe5, 0x2b, 0x24, 0xb3, 0x73, 0x8c, 0x22, 0x08, 0x08,
	0x93, 0x6a, 0xa5, 0xc6, 0xea, 0xcb, 0xad, 0xa9, 0xda, 0xc9, 0x0b, 0xe3, 0x0b, 0xf9, 0x06, 0xd6,
	0x13, 0xe3, 0xfc, 0x6f, 0x0d, 0xeb, 0xc8, 0x9b, 0xf3, 0x53, 0xde, 0x7c, 0x1b, 0xf6, 0xf1, 0xff,
	0xe0, 0xc2, 0x99, 0x7b, 0xf0, 0xf0, 0xf6, 0xf9, 0x5c, 0xde, 0xb5, 0x76, 0xc4, 0x4f, 0x97, 0x28,
	0xba, 0xc4, 0x24, 0x2d, 0x05, 0xd4, 0x21, 0x99, 0x75, 0x42, 0xdd, 0xc5, 0xe6, 0xd9, 0xeb, 0xc8,
	0x61, 0xc3, 0x91, 0xc3, 0x3e, 0x46, 0x0e, 0x7b, 0x1c, 0x3b, 0xa5, 0xe1, 0xd8, 0x29, 0xbd, 0x8f,
	0x9d, 0xd2, 0xf5, 0xbe, 0x0a, 0xe9, 0x26, 0xf5, 0xbd, 0x00, 0x7b, 0x33, 0x63, 0xb2, 0x7c, 0x10,
	0x0d, 0x62, 0x30, 0xfe, 0x62, 0x1e, 0xc1, 0xe9, 0x57, 0x00, 0x00, 0x00, 0xff, 0xff, 0xd3, 0x2c,
	0x63, 0x20, 0x0a, 0x02, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// QueryClient is the client API for Query service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type QueryClient interface {
	// Queries a list of GetTaxInfo items.
	GetTaxInfo(ctx context.Context, in *QueryGetTaxInfoRequest, opts ...grpc.CallOption) (*QueryGetTaxInfoResponse, error)
}

type queryClient struct {
	cc grpc1.ClientConn
}

func NewQueryClient(cc grpc1.ClientConn) QueryClient {
	return &queryClient{cc}
}

func (c *queryClient) GetTaxInfo(ctx context.Context, in *QueryGetTaxInfoRequest, opts ...grpc.CallOption) (*QueryGetTaxInfoResponse, error) {
	out := new(QueryGetTaxInfoResponse)
	err := c.cc.Invoke(ctx, "/bluzelle.curium.tax.Query/GetTaxInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// QueryServer is the server API for Query service.
type QueryServer interface {
	// Queries a list of GetTaxInfo items.
	GetTaxInfo(context.Context, *QueryGetTaxInfoRequest) (*QueryGetTaxInfoResponse, error)
}

// UnimplementedQueryServer can be embedded to have forward compatible implementations.
type UnimplementedQueryServer struct {
}

func (*UnimplementedQueryServer) GetTaxInfo(ctx context.Context, req *QueryGetTaxInfoRequest) (*QueryGetTaxInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTaxInfo not implemented")
}

func RegisterQueryServer(s grpc1.Server, srv QueryServer) {
	s.RegisterService(&_Query_serviceDesc, srv)
}

func _Query_GetTaxInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryGetTaxInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).GetTaxInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bluzelle.curium.tax.Query/GetTaxInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).GetTaxInfo(ctx, req.(*QueryGetTaxInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Query_serviceDesc = grpc.ServiceDesc{
	ServiceName: "bluzelle.curium.tax.Query",
	HandlerType: (*QueryServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetTaxInfo",
			Handler:    _Query_GetTaxInfo_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "tax/query.proto",
}

func (m *QueryGetTaxInfoRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryGetTaxInfoRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryGetTaxInfoRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *QueryGetTaxInfoResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryGetTaxInfoResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryGetTaxInfoResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.TaxCollector) > 0 {
		i -= len(m.TaxCollector)
		copy(dAtA[i:], m.TaxCollector)
		i = encodeVarintQuery(dAtA, i, uint64(len(m.TaxCollector)))
		i--
		dAtA[i] = 0x1a
	}
	if m.TransferTaxBp != 0 {
		i = encodeVarintQuery(dAtA, i, uint64(m.TransferTaxBp))
		i--
		dAtA[i] = 0x10
	}
	if m.GasTaxBp != 0 {
		i = encodeVarintQuery(dAtA, i, uint64(m.GasTaxBp))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintQuery(dAtA []byte, offset int, v uint64) int {
	offset -= sovQuery(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *QueryGetTaxInfoRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *QueryGetTaxInfoResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.GasTaxBp != 0 {
		n += 1 + sovQuery(uint64(m.GasTaxBp))
	}
	if m.TransferTaxBp != 0 {
		n += 1 + sovQuery(uint64(m.TransferTaxBp))
	}
	l = len(m.TaxCollector)
	if l > 0 {
		n += 1 + l + sovQuery(uint64(l))
	}
	return n
}

func sovQuery(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozQuery(x uint64) (n int) {
	return sovQuery(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *QueryGetTaxInfoRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryGetTaxInfoRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryGetTaxInfoRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryGetTaxInfoResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryGetTaxInfoResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryGetTaxInfoResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field GasTaxBp", wireType)
			}
			m.GasTaxBp = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.GasTaxBp |= int64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field TransferTaxBp", wireType)
			}
			m.TransferTaxBp = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.TransferTaxBp |= int64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TaxCollector", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TaxCollector = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipQuery(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthQuery
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupQuery
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthQuery
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthQuery        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowQuery          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupQuery = fmt.Errorf("proto: unexpected end of group")
)
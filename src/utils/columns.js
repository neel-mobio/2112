import React from 'react';

// Upcoming EMI columns
export const EMI_ADJUSTMENT_COLUMNS = (openModal) => [
  {
    title: '#',
    isSortable: false,
    dataIndex: 'srno',
    key: 'srno',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'EMI',
    dataIndex: 'emi',
    key: 'emi',
    render: (text) => {
      return parseFloat(text).toLocaleString('en-IN');
    },
  },
  {
    title: 'Adjustment',
    dataIndex: 'adjustment',
    key: 'adjustment',
    render: (text, record) => {
      if (record.paymentStatus === 'paid') {
        return '-'; // Don't show anything for paid rows
      } else {
        if (record.paymentStatus === 'amount adjusted' || record.paymentStatus === 'waive off') {
          return 'adjusted';
        } else {
          return (
            <a onClick={() => openModal(record)} style={{ color: '#2A8BF2' }}>
              adjust
            </a>
          );
        }
      }
    },
  },

  {
    title: 'Payment status',
    isSortable: true,
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
  },
  {
    title: 'Remarks',
    isSortable: true,
    dataIndex: 'remarks',
    key: 'remarks',
  },
];

// Select Jewelers columns
export const SELECT_JEWELER_LIST_COLUMNS = [
  {
    title: '#',
    isSortable: false,
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Jeweller Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, data) => {
      return data?.distributorDetails?.shopName ? data?.distributorDetails?.shopName : 'test shop';
    },
    width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

// JEWELERS AND CUSTOMERS COLUMN
export const JEWELERS_CUSTOMER_LIST_COLUMNS = (navigate, handleRecord) => {
  const viewUserDetails = (record) => {
    handleRecord(record);
    navigate(record);
    // navigate(`/customer-management/${record._id}`);
  };

  return [
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
      sorter: (a, b) =>
        a.roleId?.name?.toLowerCase() === 'jewellers'
          ? a?.distributorDetails?.shopName?.localeCompare(b?.distributorDetails?.shopName)
          : a?.firstName?.localeCompare(b?.firstName),
      render: (_, record) => {
        let name = `${record.firstName} ${record.lastName}`;

        if (record?.roleId?.name?.toLowerCase() === 'jewellers') {
          name = record?.distributorDetails?.shopName
            ? record?.distributorDetails?.shopName
            : 'try shop';
        }
        return name;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a?.email?.localeCompare(b?.email),
    },
    {
      title: 'Mobile Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Total PYDS’s',
      dataIndex: 'totalPYDSs',
      key: 'totalPYDSs',
      render: (_, record) => {
        let totalPyds = 0;
        if (record?.roleId?.name?.toLowerCase() === 'jewellers') {
          totalPyds = record?.distributorPydsCount;
        } else {
          totalPyds = record?.customerPydsCount;
        }
        return totalPyds;
      },
    },
    {
      title: 'PYDS’s',
      dataIndex: 'PYDSs',
      render: (_, record) => {
        return (
          <>
            <a onClick={() => viewUserDetails(record)}>View Details</a>
          </>
        );
      },
    },
    // {
    //   title: 'Role',
    //   dataIndex: 'role',
    //   key: 'role',
    //   sorter: isActiveAll ? (a, b) => a.roleId?.name.localeCompare(b.roleId?.name) : false,
    //   render: (_, record) => record?.roleId?.name,
    // },
    // {
    //   title: 'Access',
    //   dataIndex: 'access',
    //   key: 'access',
    //   sorter: isActiveAll ? (a, b) => a.roleId?.name.localeCompare(b.roleId?.name) : false,
    //   render: (_, record) =>
    //     (record?.roleId?.name === 'Admin' && 'Full') ||
    //     (record?.roleId?.name === 'Distributor' && 'Edit'),
    // },
    // {
    //   title: 'Activate/Deactivate',
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    // },
  ];
};
// Notification list columns
export const NOTIFICATION_LIST_COLUMNS = [
  {
    title: '#',
    isSortable: false,
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Notification',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

// Product list columns
export const PRODUCT_LIST_COLUMNS = [
  {
    title: '#',
    isSortable: false,
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Price List Name',
    isSortable: true,
    dataIndex: 'priceListName',
    key: 'priceListName',
    sorter: (a, b) => a.priceListName.localeCompare(b.priceListName),
  },
  {
    title: 'Price List Date',
    isSortable: false,
    dataIndex: 'priceListDate',
    key: 'priceListDate',
  },
  {
    title: 'Carat',
    dataIndex: 'frCts',
    key: 'frCts',
    render: (_, data) => {
      return `${data.frCts} to ${data.toCts}`;
    },
  },
  {
    title: 'Shape',
    isSortable: true,
    dataIndex: 'shapeId',
    key: 'shapeId',
    sorter: (a, b) => a.shapeId.localeCompare(b.shapeId),
    render: (_, data) => {
      return data.shapeId ? data.shapeId.toLowerCase() === 'rnd' && 'Round' : data.shapeId;
    },
  },
  {
    title: 'Color',
    isSortable: true,
    dataIndex: 'colorId',
    key: 'colorId',
    sorter: (a, b) => a.colorId.localeCompare(b.colorId),
  },
  {
    title: 'Purity',
    isSortable: true,
    dataIndex: 'purityId',
    key: 'purityId',
    sorter: (a, b) => a.purityId.localeCompare(b.purityId),
  },
  {
    title: 'Rate',
    isSortable: true,
    dataIndex: 'actRate',
    key: 'actRate',
    sorter: (a, b) => a.actRate.localeCompare(b.actRate),
    render: (_, data) => {
      return data.actRate ? parseFloat(data.actRate).toLocaleString('en-IN') : 0;
    },
  },
];

export const BOOKING_VERIFICATION_COLUMNS = [
  {
    title: '#',
    isSortable: false,
    dataIndex: 'srno',
    key: 'srno',
  },
  {
    title: 'Product',
    isSortable: false,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Weight',
    isSortable: false,
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Booking price',
    isSortable: false,
    dataIndex: 'bookingPrice',
    key: 'bookingPrice',
    render: (text) => {
      return parseFloat(text).toLocaleString('en-IN');
    },
  },
];
const formatProductDetails = (product) => {
  return `${product?.shapeId === 'RND' ? shapes.RND : product?.shapeId} ${product?.frCts}ct ${
    product?.colorId
  } ${product?.purityId}`;
};
// const bookedValue = (product) => {
//   console.log('product', product);
// };
export const BOOKING_PYDS_COLUMNS = () => [
  {
    title: '#',
    isSortable: false,
    dataIndex: 'srno',
    key: 'srno',
  },
  {
    title: 'Product',
    isSortable: false,
    dataIndex: 'productId',
    key: 'name',
    render: (_, record) => formatProductDetails(record.productId),
  },
  {
    title: 'Weight',
    isSortable: false,
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Booking price',
    isSortable: false,
    dataIndex: 'bookingPrice',
    key: 'bookingPrice',
    render: (_, record) => {
      // let bookingPrice = parseInt(record?.productId?.actRate) * parseFloat(record?.weight);
      return (
        <>
          <span>
            {(parseInt(record?.productId?.actRate) * parseFloat(record?.weight)).toLocaleString(
              'en-IN',
              {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR',
              }
            )}
          </span>
          {/* <span>{parseFloat(bookingPrice).toLocaleString('en-IN')}</span> */}
          <span hidden={true}>{record._id}</span>
        </>
      );
    },
  },
];
export const ALLOCATED_PYDS_COLUMNS = () => [
  {
    title: '#',
    isSortable: false,
    dataIndex: 'srno',
    key: 'srno',
  },
  {
    title: 'Booking',
    isSortable: false,
    dataIndex: 'booking',
    key: 'booking',
    render: (_, record) => {
      return (
        <>
          {record?.productId?.shapeId === 'RND' ? 'ROUND ' : null} {record?.productId?.frCts}
          {'ct '} {record?.productId?.colorId} {record?.productId?.purityId}
        </>
      );
    },
  },
  {
    title: 'Size Slab',
    isSortable: false,
    dataIndex: 'range',
    key: 'range',
  },
  {
    title: 'Weight',
    isSortable: false,
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Color',
    isSortable: false,
    dataIndex: 'color',
    key: 'color',
    render: (_, record) => {
      return <>{record?.productId?.colorId}</>;
    },
  },
  {
    title: 'Clarity',
    isSortable: false,
    dataIndex: 'clarity',
    key: 'clarity',
    render: (_, record) => {
      return <>{record?.productId?.purityId}</>;
    },
  },
  {
    title: 'Rate',
    isSortable: false,
    dataIndex: 'rate',
    key: 'rate',
    render: (_, record) => {
      return (
        <>
          {parseInt(record?.bookingPrice).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          })}
        </>
      );
    },
  },
  {
    title: 'New Rate',
    isSortable: false,
    dataIndex: 'new_Rate',
    key: 'new_Rate',
    render: (_, record) => {
      return (
        <>
          {parseInt(record.newRate).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          })}
        </>
      );
    },
  },
  {
    title: 'Difference Amount',
    isSortable: false,
    dataIndex: 'difference_amount',
    key: 'difference_amount',
    render: (_, record) => {
      return (
        <>
          {parseInt(record.differenceAmount).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          })}
        </>
      );
    },
  },
];
// export const BOOKING_PYDS_ALLOCATED_COLUMNS = ({ handleOpenClick }) => [
//   {
//     title: '#',
//     isSortable: false,
//     dataIndex: 'srno',
//     key: 'srno',
//   },
//   {
//     title: 'Allocated UID',
//     isSortable: false,
//     dataIndex: 'Allocated UID',
//     key: 'Allocated UID',
//     render: (_, record) => (record?.uId ? record?.uId : '-'),
//   },
//   {
//     title: 'Product',
//     isSortable: false,
//     dataIndex: 'productId',
//     key: 'name',
//     render: (_, record) => formatProductDetails(record.productId),
//   },
//   {
//     title: 'Size slab',
//     isSortable: false,
//     dataIndex: 'Size slab',
//     key: 'Size slab',
//     render: (_, record) => {
//       const range = record?.range ?? '0-0';
//       const [frCts, toCts] = range.split('-');
//       const carat = frCts + '-' + toCts;

//       return carat;
//     },
//   },

//   {
//     title: 'Weight',
//     isSortable: false,
//     dataIndex: 'weight',
//     key: 'weight',
//   },
//   {
//     title: 'Color',
//     isSortable: false,
//     dataIndex: 'Color',
//     key: 'Color',
//     render: (_, record) => record?.productId?.colorId,
//   },
//   {
//     title: 'Clarity',
//     isSortable: false,
//     dataIndex: 'Clarity',
//     key: 'Clarity',
//     render: (_, record) => record?.productId?.purityId,
//   },
//   {
//     title: 'Rate',
//     isSortable: false,
//     dataIndex: 'rate',
//     key: 'rate',
//     render: (_, record) => {
//       let rate = Number(record?.productId?.actRate) * Number(record?.weight);
//       return (
//         <>
//           {parseInt(rate).toLocaleString('en-IN', {
//             maximumFractionDigits: 2,
//             style: 'currency',
//             currency: 'INR',
//           })}
//         </>
//       );
//     },
//   },
//   {
//     title: 'New Rate',
//     isSortable: false,
//     dataIndex: 'new_Rate',
//     key: 'new_Rate',
//     render: (_, record) => {
//       return (
//         <>
//           {parseInt(record.newRate).toLocaleString('en-IN', {
//             maximumFractionDigits: 2,
//             style: 'currency',
//             currency: 'INR',
//           })}
//         </>
//       );
//     },
//   },
//   {
//     title: 'Difference Amount',
//     isSortable: false,
//     dataIndex: 'difference_amount',
//     key: 'difference_amount',
//     render: (_, record) => {
//       let rate = Number(record?.productId?.actRate) * Number(record?.weight);
//       let diff = rate - Number(record.newRate);
//       return (
//         <>
//           {parseInt(diff).toLocaleString('en-IN', {
//             maximumFractionDigits: 2,
//             style: 'currency',
//             currency: 'INR',
//           })}
//         </>
//       );
//     },
//   },
//   // {
//   //   title: 'Booking price',
//   //   isSortable: false,
//   //   dataIndex: 'bookingPrice',
//   //   key: 'bookingPrice',
//   //   render: (_, record) => {
//   //     // let bookingPrice = parseInt(record?.productId?.actRate) * parseFloat(record?.weight);
//   //     return (
//   //       <>
//   //         <span>
//   //           {(parseInt(record?.productId?.actRate) * parseFloat(record?.weight)).toLocaleString(
//   //             'en-IN',
//   //             {
//   //               maximumFractionDigits: 2,
//   //               style: 'currency',
//   //               currency: 'INR',
//   //             }
//   //           )}
//   //         </span>
//   //         {/* <span>{parseFloat(bookingPrice).toLocaleString('en-IN')}</span> */}
//   //         <span hidden={true}>{record._id}</span>
//   //       </>
//   //     );
//   //   },
//   // },
//   ...(isAdminOrAccountTeams
//     ? [
//         {
//           title: 'Action',
//           isSortable: false,
//           dataIndex: 'Action',
//           key: 'Action',
//           render: (_, record) => <a onClick={() => handleOpenClick(record)}>Allocate</a>,
//         },
//       ]
//     : []),
// ];

// const formatCurrency = (amount) => {
//   return parseInt(amount).toLocaleString('en-IN', {
//     maximumFractionDigits: 2,
//     style: 'currency',
//     currency: 'INR',
//   });
// };

// const calculateRate = (rate, weight) => Number(rate) * Number(weight);

export const BOOKING_PYDS_ALLOCATED_COLUMNS = ({ handleOpenClick }) => {
  const columns = [
    { title: '#', isSortable: false, dataIndex: 'srno', key: 'srno' },
    {
      title: 'Allocated UID',
      isSortable: false,
      dataIndex: 'Allocated UID',
      key: 'Allocated UID',
      render: (_, record) => (record?.uId ? record?.uId : '-'),
    },
    {
      title: 'Product',
      isSortable: false,
      dataIndex: 'productId',
      key: 'name',
      render: (_, record) => formatProductDetails(record.productId),
    },
    {
      title: 'Size slab',
      isSortable: false,
      dataIndex: 'Size slab',
      key: 'Size slab',
      render: (_, record) => {
        const range = record?.range ?? '0-0';
        const [frCts, toCts] = range.split('-');
        const carat = frCts + '-' + toCts;

        return carat;
      },
    },
    { title: 'Weight', isSortable: false, dataIndex: 'weight', key: 'weight' },
    {
      title: 'Color',
      isSortable: false,
      dataIndex: 'Color',
      key: 'Color',
      render: (_, record) => record?.productId?.colorId,
    },
    {
      title: 'Clarity',
      isSortable: false,
      dataIndex: 'Clarity',
      key: 'Clarity',
      render: (_, record) => record?.productId?.purityId,
    },
    {
      title: 'Rate',
      isSortable: false,
      dataIndex: 'rate',
      key: 'rate',
      render: (_, record) => {
        // let rate = Number(record?.productId?.actRate) * Number(record?.weight);
        return (
          <>
            {parseInt(record?.bookingPrice).toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR',
            })}
          </>
        );
      },
    },
    {
      title: 'New Rate',
      isSortable: false,
      dataIndex: 'new_Rate',
      key: 'new_Rate',
      render: (_, record) => {
        return (
          <>
            {parseInt(record.newRate).toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR',
            })}
          </>
        );
      },
    },
    {
      title: 'Difference Amount',
      isSortable: false,
      dataIndex: 'difference_amount',
      key: 'difference_amount',
      render: (_, record) => {
        // let rate = Number(record?.productId?.actRate) * Number(record?.weight);
        // let diff = rate - Number(record.newRate);
        return (
          <>
            {parseInt(record?.differenceAmount ? record?.differenceAmount : 0).toLocaleString(
              'en-IN',
              {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR',
              }
            )}
          </>
        );
      },
    },
    {
      title: 'Action',
      isSortable: false,
      dataIndex: 'Action',
      key: 'Action',
      render: (_, record) => <a onClick={() => handleOpenClick(record)}>Allocate</a>,
    },
  ];
  return columns;
};

export const BOOKING_PYDS_ALLOCATED_COLUMNS_Jewellers = () => {
  const columns = [
    { title: '#', isSortable: false, dataIndex: 'srno', key: 'srno' },
    {
      title: 'Allocated UID',
      isSortable: false,
      dataIndex: 'Allocated UID',
      key: 'Allocated UID',
      render: (_, record) => (record?.uId ? record?.uId : '-'),
    },
    {
      title: 'Product',
      isSortable: false,
      dataIndex: 'productId',
      key: 'name',
      render: (_, record) => formatProductDetails(record.productId),
    },
    {
      title: 'Size slab',
      isSortable: false,
      dataIndex: 'Size slab',
      key: 'Size slab',
      render: (_, record) => {
        const range = record?.range ?? '0-0';
        const [frCts, toCts] = range.split('-');
        const carat = frCts + '-' + toCts;

        return carat;
      },
    },
    { title: 'Weight', isSortable: false, dataIndex: 'weight', key: 'weight' },
    {
      title: 'Color',
      isSortable: false,
      dataIndex: 'Color',
      key: 'Color',
      render: (_, record) => record?.productId?.colorId,
    },
    {
      title: 'Clarity',
      isSortable: false,
      dataIndex: 'Clarity',
      key: 'Clarity',
      render: (_, record) => record?.productId?.purityId,
    },
    {
      title: 'Rate',
      isSortable: false,
      dataIndex: 'rate',
      key: 'rate',
      render: (_, record) => {
        // let rate = Number(record?.productId?.actRate) * Number(record?.weight);
        return (
          <>
            {parseInt(record?.bookingPrice).toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR',
            })}
          </>
        );
      },
    },
    {
      title: 'New Rate',
      isSortable: false,
      dataIndex: 'new_Rate',
      key: 'new_Rate',
      render: (_, record) => {
        return (
          <>
            {parseInt(record.newRate).toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR',
            })}
          </>
        );
      },
    },
    {
      title: 'Difference Amount',
      isSortable: false,
      dataIndex: 'difference_amount',
      key: 'difference_amount',
      render: (_, record) => {
        // let rate = Number(record?.productId?.actRate) * Number(record?.weight);
        // let diff = rate - Number(record.newRate);
        return (
          <>
            {parseInt(record?.differenceAmount ? record?.differenceAmount : 0).toLocaleString(
              'en-IN',
              {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR',
              }
            )}
          </>
        );
      },
    },
  ];

  return columns;
};

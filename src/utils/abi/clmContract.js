const clmContract = [
  {
    constant: true,
    inputs: [{ name: 'tokenOwner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]

export default clmContract

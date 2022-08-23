export interface IQuery {
  page?: number
  limit?: number
  search?: string
  total?: number
  [x: string]: any
}

export interface PaginationInterface {
  status?: number | null
  total?: number
  page: number
  limit: number
  [x: string]: any
}

// export interface IBodyApiVerifyCode {
//   email?: string | (string | null)[]
//   phone?: string | (string | null)[]
//   reason?: string | (string | null)[]
//   verificationCode: number | string
//   [x: string]: any
// }
export interface IBodyApiVerify {
  email?: string | (string | null)[]
  password?: string | (string | null)[] | null
  phone?: string | (string | null)[]
  countryCode?: string | (string | null)[]
  country?: string | (string | null)[]
  reason?: string | (string | null)[]
  verificationCodeEmail?: string | number
  verificationCodeSms?: string | number
  verificationCodeGa?: string | number
  verificationCode?: string | number
  [x: string]: any
}

export interface IBodyApiLogin {
  email: string
  password: string
}

export interface IBodyApiCreateLogLogin {
  deviceGuid?: string
  deviceSerial?: string
  deviceType?: string
  deviceName?: string
  deviceOs?: string
  deviceToken?: string
  deviceEndPoint?: string
  appVersion?: string
  sourceType: string
}

export interface IUser {
  affiliationCode: string
  createdAt: string | null
  email: string | null
  firstName: string
  fullName: string
  idPhoto1: string | null
  idPhoto2: string | null
  identificationNumber: string | number | null
  identificationType: string | null
  kycStatus: string | null | boolean
  lastName: string
  nationality: string | null
  pinEnabled: boolean
  selfiePhoto: string | null
  status: string | null | boolean
  userId: number
  [x: string]: any
}

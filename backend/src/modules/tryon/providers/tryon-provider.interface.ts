export type ProviderSubmitInput = {
  garmentImageUrl: string
  modelImageUrl?: string
}

export type ProviderSubmitResult = {
  providerTaskId: string
  resultImageUrl: string
}

export interface TryOnProvider {
  readonly name: string
  submitAndWait(input: ProviderSubmitInput): Promise<ProviderSubmitResult>
}

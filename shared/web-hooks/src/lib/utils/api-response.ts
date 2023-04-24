export type ApiResponse = Readonly<{
    success: boolean
    message?: string
    reason?: unknown
    status?: number
    text?: string
    detail?: string
    payload?: {
        message: string
        reason: unknown
        success: boolean
    }
}>

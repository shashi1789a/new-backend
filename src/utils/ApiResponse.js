class ApiResponse{
    constructor(statusCode, massage, data, massage ="success"){
      this.statusCode = statusCode
      this.massage = massage
      this.data = data
      this.success = statusCode < 400
    
}
}
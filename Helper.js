var getTimeStamp = function(){
    return Math.round(new Date().getTime/ 1000)
}
module.exports = {getTimeStamp};

openapi: "3.0.0"
info:
  title: Printer Group  API
  description: THE API WHICH WIll PERFORM PRINTER GROUP CRUD OPERATIONS.
  version: 1.0.0

tags: 
 name: PrinterGroup

paths:
  /createPrinter:
    post:
      summary: Create Printer!
      tags: [PrinterGroup]
      description: Create A Printer.  
      requestBody:
        required: true
        content:
          application/json:
            schema: 
                type: object
                properties:
                  id:
                    type: integer
                  title:
                    type: string
                  description:
                    type: string
                  printType:
                    type: enum 
                  triggers:    
                    type: array 
                    items: 
                      type: object 
                    properties:
                    trigger:
                      type: enum
                    orderType:
                      type: enum            
      responses:
        200:
          description: The Trigger is Created!
          content:
            application/json:
              schema:
                type: object
                properties:
                  title:
                    type: string
                  description:
                    type: string
                  printType:
                    type: string
  /printer/:printerId:
    put:
      summary: Update Printer!
      tags: [PrinterGroup]
      description: Update A Printer.
      parameters:
        - in: path
          name: printerId
          schema:
            type: integer
          required: true  
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                description:
                  type: string 
                printType:
                  type: enum     
      responses:
        200:
          description: The Printer is updated!
          content:
            application/json:
              schema:
              type: object
              properties:
                title:
                  type: string
                description:
                  type: string 
                printType:
                  type: enum
  /printerTrigger/:printerId:
    put:
      summary: Update Trigger!
      tags: [PrinterGroup]
      description: Update An Triggers.
      parameters:
        - in: path
          name: printerId
          schema:
            type: integer
          required: true  
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                trigger:
                  type: enum
                orderType:
                  type: enum      
      responses:
        200:
          description: The Trigger is updated!
          content:
            application/json:
              schema:
              type: object
              properties:
                trigger:
                  type: enum
                orderType:
                  type: enum
  /printerList:
    put:
      summary: Get Printers!
      tags: [PrinterGroup]
      description: Get All Printers with Triggers.      
      responses:
        200:
          description: The Trigger is updated!
          content:
            application/json:
              schema: 
                type: object
                properties:
                  id:
                    type: integer
                  title:
                    type: string
                  description:
                    type: string
                  printType:
                    type: enum 
                  triggers:    
                    type: array 
                    items: 
                      type: object 
                    properties:
                    trigger:
                      type: enum
                    orderType:
                      type: enum                
                                                    

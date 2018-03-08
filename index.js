function command (){
    this.command = {}
}

// 监听
command.prototype.on = function(name = '',dscp = '',callBack){
    if (name !== '' && dscp !== '' && !this.command[name]){
        this.command = {...this.command,[name]:{dscp,callBack}}
    }
}

// 执行
command.prototype.excel = function(){
    const script = process.argv[2]
    const params = process.argv.slice(3)
    if (['-h','-help'].indexOf(script) !== -1){
        this.help()
    }else {
        Object.keys(this.command).forEach((e)=>{
            const cw = this.command[e]
            if (e.split(',').indexOf(script) !== -1){
                cw.callBack && cw.callBack(params)
            }
        })
    }
}

// 帮助
command.prototype.help = function(){
    let msg = ''
    Object.keys(this.command).forEach((e)=>{
        const cw = this.command[e]
        msg += e + '   ' + cw.dscp + '\n'
    })
    console.log(msg)
}

module.exports = {
    command: new command()
}
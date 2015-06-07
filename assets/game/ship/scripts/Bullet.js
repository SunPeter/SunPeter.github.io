/**
 * Created by peter on 15-6-7.
 */
function Bullet(x, y)
{
    this.loc = new Vector(x, y);
    this.speed = 13;
    this.width = 32;
    this.isDie = false;
}

Bullet.prototype.update = function()
{
    this.loc.y -= this.speed;
    if(this.loc.y < -32) this.isDie = true;
};

Bullet.prototype.draw = function()
{
    var img = document.getElementById("bulletImg");
    ctx.drawImage(img, 0, 0, 32, 32, this.loc.x, this.loc.y, 32, 32) ;
};

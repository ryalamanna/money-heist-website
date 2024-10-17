if(document.readyState=='loading')
{
    document.addEventListener('DOMContentLoaded',ready)
}
else
{
    ready()
}


function ready()
{
    var removecartitembtn = document.getElementsByClassName('btn-danger')

    for(var i=0;i<removecartitembtn.length;i++)
        {
            var button=removecartitembtn[i];
            button.addEventListener('click',removeitemfunction)
        }

    var quantityinput=document.getElementsByClassName('cart-quantity-input')
    for(var i=0;i<quantityinput.length;i++)
    {
        var input=quantityinput[i]
        input.addEventListener('change',quantitychanged)
    }

    var addtocartbtnelement = document.getElementsByClassName('shop-item-btn')
    for(var i=0;i<addtocartbtnelement.length;i++)
    {
        var button=addtocartbtnelement[i]
        button.addEventListener('click',addtocart)
    }

    var purchasebuttonelement=document.getElementsByClassName('btn-purchase')[0]
    purchasebuttonelement.addEventListener('click',purchasefunction) 
}



function removeitemfunction(event)
    {//eventlistner always returns an object inside the object (ie 'event') it calls and that object has a property 'target'//
        var buttonclicked=event.target //here target is the button we clicked//
        buttonclicked.parentElement.parentElement.remove()
        updatecarttotal()
    }




function updatecarttotal()
    {
        var cartitemscontainer= document.getElementsByClassName('cart-items')[0]
        var cartrows=cartitemscontainer.getElementsByClassName('cart-row')
        var total=0

        for(var i=0;i<cartrows.length;i++)
        {
            var cartrow=cartrows[i]
            var priceelement=cartrow.getElementsByClassName('cart-price')[0]
            var quantityelement=cartrow.getElementsByClassName('cart-quantity-input')[0]
            
            var price=parseFloat(priceelement.innerHTML.replace('$',''))
            var quantity=quantityelement.value
            
            total=total +(price*quantity) 
           }
           total=(parseInt(total*100))/100;
           document.getElementsByClassName('cart-total-price')[0].innerText="$"+total 
           
    }


    function quantitychanged(event)
    {
        var input=event.target
        if(isNaN(input.value) || input.value<=0 )
        {
            input.value=1
        }
        updatecarttotal()
    }

    function addtocart(event){
        var button=event.target
        var shopitem=button.parentElement.parentElement
        var itemtitle=shopitem.getElementsByClassName('shop-item-title')[0].innerHTML
        var itemprice=shopitem.getElementsByClassName('shop-item-price')[0].innerHTML
        var itemimgsrc=shopitem.getElementsByClassName('shop-item-img')[0].src
        
        var cartitems =document.getElementsByClassName('cart-items')[0]
        var cartitemdiv = document.createElement('div')
        cartitemdiv.classList.add('cart-row')

        var cartitemtitles=document.getElementsByClassName('cart-item-title')
        for(i=0;i<cartitemtitles.length;i++)
        {
            if(cartitemtitles[i].innerText==itemtitle)
            {
                alert('item already in the cart!')
                return
            }
        }
        
        var cartitemdiv_contents=` <div class="cart-item cart-column">
        <img class="cart-item-img" src="${itemimgsrc}" width="30">
        <span class="cart-item-title">${itemtitle}</span>
    </div>
        <span class="cart-price cart-column">${itemprice}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-primary btn-danger" type="button">Remove</button>
    </div>`

        cartitemdiv.innerHTML=cartitemdiv_contents
        cartitems.append(cartitemdiv)

        cartitemdiv.getElementsByClassName('btn-danger')[0].addEventListener('click',removeitemfunction)
        cartitemdiv.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantitychanged)
        updatecarttotal()
        var cartitem= document.getElementsByClassName('cart-item')
        console.log(cartitem.length)
        console.log(cartitem)
    }

    function purchasefunction()
    {
        var cartitems=document.getElementsByClassName('cart-items')[0]
        var cartitem= document.getElementsByClassName('cart-item')

        if(cartitem.length==1)
        {
            alert('cart empty')
        }
        else
        {
            alert('PURCHASE SUCCESSFUL')
            while(cartitems.hasChildNodes())
            {
                cartitems.removeChild(cartitems.firstChild)
            }
        }
        updatecarttotal()
        
    }
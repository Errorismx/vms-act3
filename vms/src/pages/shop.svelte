<script>
export let pages
let toy = [
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},{name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1300},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
    {name : 'Toy Name Holder', img: 'toy1' , price : 1000},
    {name : 'Toy Name Holder', img: 'toy1' , price : 690},
]
</script>
<main>
    <nav class="bg-[#514647]">
        <div class="h-[100px] w-full">
            <div class="container mx-auto h-[31px] flex items-center relative">
                <div class="credit"><img  src="../img/credit.png" alt=""></div>
                <div class="absolute right-0 flex actionside ">
                    <div class="text-[11px] text-white Kanitfont"><span class="flex"> Change Language<img src="../img/icons8_chevron_down_10px.png" alt="" class="w-[10px] h-[10px] mt-[3px] ml-[1px]"></span></div>
                    <div class="pl-[21px] text-[11px] text-white Kanitfont"> <span class="flex">Login<img src="../img/icons8_chevron_down_10px.png" alt="" class="w-[10px] h-[10px] mt-[3px] ml-[1px]"></span></div>
                </div>
            </div>
            <div class="whiteline w-full h-[2px] bg-white"></div>
            <div class="container relative flex items-center mx-auto h-[67px]">
                <img src="../img/FirstToyproductIcon.png" class="hover:opacity-60" alt="" on:click="{() => { pages = 'home'}}">
                <div class="bar w-[340px] ml-[46px] flex">
                    <button class="text-white hover:opacity-60 Kanitfont focus:outline-none">SALES</button>
                    <button class="text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px]">NEW ARRIVE</button>
                    <button class="text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px]">AGE</button>
                    <button class="text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px]">BRAND</button>
                    <div class="absolute right-0 flex imgaction">
                        <button class="hover:opacity-60"><img src="../img/icons8_search_filled_64px.png" alt=""></button>
                        <button class="ml-[20px] hover:opacity-60"><img src="../img/icons8_shopping_bag_filled_100px.png" alt=""></button>

                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="container relative mx-auto">
        <h1 class="text-[#5B5B5B] Kanitfont text-[12px] mt-[20px]">HOME - PUPPET</h1>

        <img class="mt-[23px] w-full h-[312px]" src="../img/imagepromotion.png" alt="">

        <div class="itemfilter flex items-center w-[336px] h-[31px] absolute right-0 mt-[16px]"> 
            <div class="count Kanitfont text-[12px]" >1-95 of 95 items</div>
            <div class="ml-[40px] count Kanitfont text-[12px] border border-black w-[210px] h-full flex items-center relative" > <p class="pl-[10px]">New Arrive</p>  <img class="absolute right-0 mr-[5px]" src="../img/icons8_chevron_down_64pxblack.png" alt=""></div>
        </div>
        <div class="mt-[75px] w-[100%] h-full justify-start grid grid-cols-6	">
            {#each toy as v , i}
                
      
            <div class="box w-[248px] h-[331px] "> 
                <div class="imgholder h-[248px] border border-[#240F04]"><img src="https://via.placeholder.com/248" alt=""></div>
                <div class="imgholder h-[83px] text-black Kanitfont justify-center text-center">
                    <h1 class="mt-[2px]">{v.name}</h1>
                    <h1 class="mt-[2px] line-through text-xs text-[#98817C]">{v.price * 1.30}&nbsp;THB</h1>
                    <h1 class="text-[#3E5A8F] flex text-center justify-center ">{v.price}&nbsp;THB</h1>
                </div>
            </div>
            {/each}
        </div>
        
        
        

    </div>

</main>
<style>
.Kanitfont {
        font-family: 'Kanit', sans-serif;
    }
   

</style>
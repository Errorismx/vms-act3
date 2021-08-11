<script>
    export let pages

</script>
<main >
    <div class="bg-baby h-[100vh] relative ">
        <div class="sidefade w-[80vw] h-[100vh] bg-gradient-to-r from-[#514647] to-transparent absolute z-0"/>
            
        <nav class="bg-[#240F0440] absolute w-full">
            <div class="px-2 mx-auto sm:px-6 lg:px-24">
                <div class="flex items-center justify-end h-16">
                    <!-- <button class='text-white focus:outline-none opacity-60 hover:opacity-100 Kanitfont' ><span class="flex">Login<img src="../img/icons8_chevron_down_64px.png" alt=""></span>  </button> -->
                </div>
            </div>
        </nav>
        
        <div class="z-10 px-[301px] pt-[240px] absolute "><img src="../img/FirstToy.png" alt="">
            <div class="info">
                <h1 class="text-4xl text-white pt-[30px]"> Lorem ipsum dolor sit amet, consectetur adipiscing </h1>
                <h3 class="text-xl text-white pt-[10px]"> Lorem ipsum dolor sit amet, consectetur adipiscing </h3>
            </div>
            <div class="flex actionbutton mt-[50px]">
                <button class="rounded-full	 w-[379px] h-[65px] bg-[#F5B41A60] text-white Kanitfont text-[20px] focus:outline-none hover:bg-[#F5B41A90]" on:click="{()=> { pages = 'shop' }}">GO TO SHOP</button>
                <button class="ml-[32px] rounded-full	 w-[379px] h-[65px] bg-[#240F0460] text-white Kanitfont text-[20px] hover:bg-[#240F0490]">Contract</button>
            </div>
        </div>
        
    </div>
     <div class="info  h-[2000px] bg-[#514647] ">
         <div class="container w-[100%] h-[100%] mx-auto ">
             <div class="flex flex-col items-center justify-center text-white align-middle">
                 <h1 class="pt-[100px] Kanitfont text-[36px]">Our Product</h1>
                 <h4 class="Kanitfont text-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
                 <div class="flex ageimgbox pt-[60px] gap-4">
                     <div class="age1 w-[272px] h-[341px] ">
                         <img src="../img/24month.png" class="w-[272px] h-[272px]" alt="">
                         <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center"> birth to 24 months</div>
                     </div>
                     <div class="age2 w-[272px] h-[341px] ">
                        <img src="../img/2_4year.png" class="w-[272px] h-[272px]" alt="">
                        <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center"> 2 to 4 years</div>
                    </div>
                    <div class="age3 w-[272px] h-[341px] ">
                        <img src="../img/5_7year.png" class="w-[272px] h-[272px]" alt="">
                        <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center"> 5 to 7 years </div>
                    </div>
                    <div class="age4 w-[272px] h-[341px] ">
                        <img src="../img/8_13year.png" class="w-[272px] h-[272px]" alt="">
                        <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center"> 8 to 13 years & up</div>
                    </div>
                 </div>

                 <h1 class="pt-[103px] Kanitfont text-[36px]">Our Service</h1>
                 <h4 class="Kanitfont text-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>

                 <div class="servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center">
                     <img class="ml-[169px] w-[144px] h-[144px]" src="../img/icons8_shipped_100px_2.png" alt="">
                     <div class="pl-[61px] serinfo">
                         <h1 class="Kanitfont text-white text-[48px]">Free Shipping</h1>
                         <h4 class="Kanitfont text-[18px] w-[780px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae, </h4>
                         
                        </div>
                    </div>
                    
                    <div class="servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center">
                     <img class="ml-[169px] w-[144px] h-[144px]" src="../img/icons8_data_arrived_filled_100px.png" alt="">
                    <div class="pl-[61px] serinfo">
                        <h1 class="Kanitfont text-white text-[48px]">High Quality</h1>
                        <h4 class="Kanitfont text-[18px] w-[780px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae, </h4>

                    </div>
                </div>

                   
                <div class="servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center">
                    <img class="ml-[169px] w-[144px] h-[144px]" src="../img/icons8_get_cash_filled_100px.png" alt="">
                    <div class="pl-[61px] serinfo">
                        <h1 class="Kanitfont text-white text-[48px]">Refundable</h1>
                        <h4 class="Kanitfont text-[18px] w-[780px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae, </h4>

                    </div>
                </div>
                 

             </div>
             
         </div>
     </div>
     <div class="footer w-full h-[301px] bg-[#C4C4C4] flex">
         <div class="f1 w-[757px] ml-[180px] mt-[37px]">
             <img src="../img/FirstToy_minicon.png" alt="">
             <h4 class="Kanitfont text-[24px] w-[780px] mt-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae, dignissim gravida risus. Maecenas facilisis, dolor fringilla sagittis commodo,</h4>

         </div>
         <div class="f2 w-[372px] mt-[37px] ml-[159px]">
            <h1 class="Kanitfont text-[36px]">Place</h1>
            <h4 class="Kanitfont text-[24px] w-[394px] mt-[10px]">celerisque quis libero vitae, dignissim gravida risus. Maecenas commodo,</h4>

         </div>
         <div class="f3 w-[130px] mt-[137px] ml-[162px]">
            <h1 class="Kanitfont text-[24px]">Contract Us</h1>
            <div class="flex items-center justify-center socialimg">
                <img src="../img/icons8_instagram_new_100px.png" class="w-[59px] h-[59px]"alt="">
                <img src="../img/icons8_facebook_100px.png" class="w-[59px] h-[59px]"alt="">
            </div>

         </div>
     </div>
   
</main>
<style>
    .Kanitfont {
        font-family: 'Kanit', sans-serif;
    }
   
.bg-baby{
    background-image: url('../img/home_bg.png');
    background-repeat: no-repeat;
    background-size:cover;
  }
 
</style>
//建立元件
export default {
  props:["pages","getData"],
  //分頁元件
  
  //   template: `<nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item"
  //     :class="{disabled: !pages.has_pre}">
  //       <a class="page-link" href="#"
  //       @click="getData(pages.current_page-1)">Previous</a>
  //     </li>

  //     <li class="page-item" 
  //       v-for="page in pages.total_pages" :key="page+ 'page'"
  //       :class="{active: page == pages.current_page}">
  //       <a class="page-link" href="#" @click="getData(page)">{{ page }}</a>
  //     </li>
      
  //     <li class="page-item"
  //     :class="{disabled: !pages.has_next}">
  //       <a class="page-link" href="#"
  //       @click="getData(pages.current_page+1)">Next</a>
  //     </li>
  //   </ul>
  // </nav>`,
  
  //emit 寫法
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"
    :class="{disabled: !pages.has_pre}">
      <a class="page-link" href="#"
      @click="$emit('changePage', pages.current_page-1)">Previous</a>
    </li>

    <li class="page-item" 
      v-for="page in pages.total_pages" :key="page+ 'page'"
      :class="{active: page == pages.current_page}">
      <a class="page-link" href="#" 
      @click="$emit('changePage', page)">{{ page }}</a>
    </li>
    
    <li class="page-item"
    :class="{disabled: !pages.has_next}">
      <a class="page-link" href="#"
      @click="$emit('changePage', pages.current_page+1)">Next</a>
    </li>
  </ul>
</nav>`

}
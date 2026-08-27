<?php

namespace BitCode\BitForm\Core\Fallback;

use BitCode\BitForm\Core\Database\DB;

/**
 * Init-time schema guard for columns the FRONTEND read path depends on.
 *
 */
class SchemaFallback
{
  public function ensureEmailTemplateStatusColumn()
  {
    DB::ensureEmailTemplateStatusColumn();
  }

  public function ensureWorkflowCategoryColumn()
  {
    DB::ensureWorkflowCategoryColumn();
  }

  /**
   * Repair every workflows column the read path needs (order/info/category/status).
   *
   * @return bool
   */
  public function ensureWorkflowSchema()
  {
    return DB::ensureWorkflowSchema();
  }
}
